const crypto = require("crypto");
const pool = require("../db");

// Hardcoded fixed price rule per business specification
const PAYU_PRICE_INR = "99.00";
const PAYU_PRODUCT_INFO = "ATS Resume Download";

// Get PayU Configuration from environment
const getPayUConfig = () => {
  const key = process.env.PAYU_MERCHANT_KEY;
  const salt = process.env.PAYU_MERCHANT_SALT;
  if (!key || !salt) {
    throw new Error("PayU credentials missing in backend environment.");
  }
  const isProd = process.env.PAYU_ENV === "production";
  const actionUrl = isProd
    ? "https://secure.payu.in/_payment"
    : "https://test.payu.in/_payment";
  return { key, salt, actionUrl };
};

// 1. Initiate PayU Payment (Creates pending record & generates request hash)
async function initiatePayUPayment(req, res, next) {
  try {
    const userId = req.user.id;
    const resumeId = Number(req.body.resumeId);

    if (!resumeId || isNaN(resumeId)) {
      return res.status(400).json({ success: false, error: "Valid resumeId is required." });
    }

    // Step 6: Verify user owns the resume
    const [resumes] = await pool.execute(
      "SELECT id, title, is_paid FROM resumes WHERE id = ? AND user_id = ? LIMIT 1",
      [resumeId, userId]
    );

    if (!resumes[0]) {
      return res.status(404).json({ success: false, error: "Resume not found or access denied." });
    }

    // If already paid in DB, return unlocked status
    if (resumes[0].is_paid) {
      return res.json({
        success: true,
        isAlreadyPaid: true,
        paymentStatus: "SUCCESS",
        downloadAllowed: true,
      });
    }

    // Check if there is already a SUCCESS payment in payments table
    const [existingPaid] = await pool.execute(
      "SELECT id FROM payments WHERE resume_id = ? AND user_id = ? AND status = 'SUCCESS' LIMIT 1",
      [resumeId, userId]
    );

    if (existingPaid.length > 0) {
      await pool.execute("UPDATE resumes SET is_paid = 1 WHERE id = ?", [resumeId]);
      return res.json({
        success: true,
        isAlreadyPaid: true,
        paymentStatus: "SUCCESS",
        downloadAllowed: true,
      });
    }

    // Step 6: Fetch customer details securely from database
    const [userRows] = await pool.execute(
      "SELECT name, email FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    const user = userRows[0] || {};
    const firstname = (user.name || "Candidate").trim();
    const email = (user.email || "candidate@example.com").trim().toLowerCase();
    const phone = "9876543210";

    // Step 3 & 6: Generate unique transaction ID & enforce amount = 99.00
    const txnid = `TXN_PAYU_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const amount = PAYU_PRICE_INR; // Enforced 99.00 INR on backend
    const productinfo = PAYU_PRODUCT_INFO;

    const udf1 = String(resumeId);
    const udf2 = String(userId);
    const udf3 = "";
    const udf4 = "";
    const udf5 = "";

    // Step 6: Create PENDING payment record in database
    await pool.execute(
      `INSERT INTO payments (user_id, resume_id, transaction_id, amount, currency, gateway, status)
       VALUES (?, ?, ?, ?, 'INR', 'PAYU', 'PENDING')`,
      [userId, resumeId, txnid, amount]
    );

    const { key, salt, actionUrl } = getPayUConfig();

    // Step 7: Generate PayU Request Hash
    // Sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
    const hashSequence = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashSequence).digest("hex");

    const host = req.get("host");
    const protocol = req.protocol;
    const surl = `${protocol}://${host}/api/payment/payu/success`;
    const furl = `${protocol}://${host}/api/payment/payu/failure`;

    res.json({
      success: true,
      actionUrl,
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      udf1,
      udf2,
      hash,
      surl,
      furl,
    });
  } catch (error) {
    next(error);
  }
}

// 2. Step 8: PayU Success Response Handler & Hash Verification
async function handlePayUSuccess(req, res, next) {
  try {
    const { salt } = getPayUConfig();

    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      key,
      hash,
      udf1, // resumeId
      udf2, // userId
      udf3 = "",
      udf4 = "",
      udf5 = "",
      mihpayid,
      payuMoneyId,
      additionalCharges: rawCharges,
      additional_charges: snakeCharges,
    } = req.body;

    const additionalCharges = rawCharges || snakeCharges || "";
    const resumeId = Number(udf1);
    const userId = Number(udf2);
    const gatewayRef = mihpayid || payuMoneyId || txnid;

    // Step 8: Verify PayU Response Hash
    // Reverse Hash Formula:
    // sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    let reverseHashString = "";
    if (additionalCharges) {
      reverseHashString = `${additionalCharges}|${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    } else {
      reverseHashString = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    }

    const calculatedHash = crypto.createHash("sha512").update(reverseHashString).digest("hex");

    // Check hash validity
    if (!hash || hash.toLowerCase() !== calculatedHash.toLowerCase()) {
      console.warn("PayU Success Callback failed hash verification.");
      if (txnid) {
        await pool.execute(
          "UPDATE payments SET status = 'FAILED', failure_reason = 'Invalid response hash signature' WHERE transaction_id = ?",
          [txnid]
        );
      }
      return res.status(400).send(renderResponseHtml(false, "Invalid payment hash signature", resumeId));
    }

    // Step 8: Verify Transaction exists in database
    const [payments] = await pool.execute(
      "SELECT id, status, amount, user_id, resume_id FROM payments WHERE transaction_id = ? LIMIT 1",
      [txnid]
    );

    if (payments.length === 0) {
      return res.status(400).send(renderResponseHtml(false, "Transaction not found", resumeId));
    }

    const paymentRecord = payments[0];

    // Step 8: Verify amount matches backend configured ₹99.00
    if (Number(amount).toFixed(2) !== Number(PAYU_PRICE_INR).toFixed(2)) {
      await pool.execute(
        "UPDATE payments SET status = 'FAILED', failure_reason = 'Amount mismatch' WHERE transaction_id = ?",
        [txnid]
      );
      return res.status(400).send(renderResponseHtml(false, "Payment amount mismatch", resumeId));
    }

    // Step 17: Idempotency check — if already processed, return success without duplicate edits
    if (paymentRecord.status === "SUCCESS") {
      return res.send(renderResponseHtml(true, "Payment already processed", paymentRecord.resume_id));
    }

    // Step 8 & 10: Update Payment Status to SUCCESS
    await pool.execute(
      `UPDATE payments 
       SET status = 'SUCCESS', gateway_reference = ?, paid_at = NOW() 
       WHERE transaction_id = ?`,
      [gatewayRef, txnid]
    );

    // Step 8 & 10: Unlock Resume in Database
    await pool.execute(
      "UPDATE resumes SET is_paid = 1 WHERE id = ?",
      [paymentRecord.resume_id]
    );

    res.send(renderResponseHtml(true, "Payment verified successfully", paymentRecord.resume_id));
  } catch (error) {
    next(error);
  }
}

// 3. Step 9: PayU Failure / Cancellation Response Handler
async function handlePayUFailure(req, res, next) {
  try {
    const { txnid, status, unmappedstatus, field9, udf1 } = req.body;
    const resumeId = Number(udf1);
    const failureReason = unmappedstatus || field9 || "Payment failed or cancelled by user";
    const paymentStatus = status === "userCancelled" || unmappedstatus === "userCancelled" ? "CANCELLED" : "FAILED";

    if (txnid) {
      await pool.execute(
        "UPDATE payments SET status = ?, failure_reason = ? WHERE transaction_id = ?",
        [paymentStatus, failureReason, txnid]
      );
    }

    res.send(renderResponseHtml(false, failureReason, resumeId));
  } catch (error) {
    next(error);
  }
}

// 4. Step 13: Get Payment Status for Resume
async function getPaymentStatus(req, res, next) {
  try {
    const userId = req.user.id;
    const resumeId = Number(req.params.resumeId);

    if (!resumeId || isNaN(resumeId)) {
      return res.status(400).json({ success: false, error: "Valid resumeId is required." });
    }

    // Verify user owns resume
    const [resumes] = await pool.execute(
      "SELECT id, is_paid FROM resumes WHERE id = ? AND user_id = ? LIMIT 1",
      [resumeId, userId]
    );

    if (resumes.length === 0) {
      return res.status(404).json({ success: false, error: "Resume not found or access denied." });
    }

    if (resumes[0].is_paid) {
      return res.json({
        success: true,
        paymentStatus: "SUCCESS",
        downloadAllowed: true,
      });
    }

    // Query DB payments table
    const [payments] = await pool.execute(
      "SELECT status FROM payments WHERE resume_id = ? AND user_id = ? AND status = 'SUCCESS' LIMIT 1",
      [resumeId, userId]
    );

    if (payments.length > 0) {
      await pool.execute("UPDATE resumes SET is_paid = 1 WHERE id = ?", [resumeId]);
      return res.json({
        success: true,
        paymentStatus: "SUCCESS",
        downloadAllowed: true,
      });
    }

    return res.json({
      success: true,
      paymentStatus: "UNPAID",
      downloadAllowed: false,
    });
  } catch (error) {
    next(error);
  }
}

// Helper to render HTML popup response
function renderResponseHtml(isSuccess, message, resumeId) {
  const frontendUrl = process.env.APP_URL || "http://localhost:5173";
  return `
    <!DOCTYPE html>
    <html>
    <head><title>${isSuccess ? "Payment Successful" : "Payment Failed"}</title></head>
    <body style="font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 40px; background: #F8FAFC;">
      <div style="max-width: 420px; margin: 40px auto; background: white; padding: 32px; border-radius: 16px; border: 1px solid #E2E8F0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
        <h2 style="color: ${isSuccess ? "#10B981" : "#EF4444"}; margin-bottom: 10px; font-size: 20px;">
          ${isSuccess ? "✔ Payment Verified (₹99)" : "❌ Payment Failed"}
        </h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">${message}</p>
        <p style="color: #94A3B8; font-size: 12px; margin-top: 20px;">Returning to ResumeForge...</p>
      </div>
      <script>
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
              type: '${isSuccess ? "PAYU_PAYMENT_SUCCESS" : "PAYU_PAYMENT_FAILED"}',
              resumeId: '${resumeId || ""}'
            }, '*');
            setTimeout(function() { window.close(); }, 1200);
          } else {
            setTimeout(function() {
              window.location.href = '${frontendUrl}/builder?id=${resumeId || ""}&payment=${isSuccess ? "success" : "failed"}';
            }, 1200);
          }
        } catch (e) {
          window.location.href = '${frontendUrl}/builder?id=${resumeId || ""}&payment=${isSuccess ? "success" : "failed"}';
        }
      </script>
    </body>
    </html>
  `;
}

module.exports = {
  initiatePayUPayment,
  handlePayUSuccess,
  handlePayUFailure,
  getPaymentStatus,
};
