import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
/**
 * Normalizes any computed oklch / modern CSS colors to standard RGB strings
 * using the browser's native canvas context, guaranteeing full compatibility.
 */
function sanitizeColorsForExport(rootElement) {
    try {
        const dummyCanvas = document.createElement('canvas');
        const ctx = dummyCanvas.getContext('2d');
        if (!ctx)
            return;
        const elements = [rootElement, ...Array.from(rootElement.querySelectorAll('*'))];
        const colorProps = [
            'color',
            'backgroundColor',
            'borderColor',
            'borderTopColor',
            'borderBottomColor',
            'borderLeftColor',
            'borderRightColor',
            'outlineColor',
        ];
        for (const el of elements) {
            const computed = window.getComputedStyle(el);
            for (const prop of colorProps) {
                const val = computed[prop];
                if (val && typeof val === 'string' && (val.includes('oklch') || val.includes('oklab') || val.includes('color('))) {
                    ctx.fillStyle = '#000000';
                    try {
                        ctx.fillStyle = val;
                        const resolved = ctx.fillStyle;
                        if (resolved && resolved !== '#000000') {
                            el.style[prop] = resolved;
                        }
                        else if (prop === 'color') {
                            el.style.color = '#0f172a';
                        }
                        else if (prop === 'backgroundColor') {
                            el.style.backgroundColor = '#ffffff';
                        }
                    }
                    catch {
                        // fallback gracefully
                    }
                }
            }
        }
    }
    catch (err) {
        console.warn('Color normalization notice:', err);
    }
}
export async function exportResumeToPDF(elementId, filename = 'Resume.pdf') {
    const original = document.getElementById(elementId);
    if (!original) {
        throw new Error('Resume preview element not found.');
    }
    // Clone element into an offscreen container to guarantee 100% scale without zoom distortion
    const clone = original.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.width = '794px'; // 210mm at standard 96 DPI
    clone.style.minHeight = '1123px'; // 297mm at standard 96 DPI
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-99999px';
    container.style.left = '-99999px';
    container.style.width = '794px';
    container.style.zIndex = '-1000';
    container.style.backgroundColor = '#ffffff';
    container.appendChild(clone);
    document.body.appendChild(container);
    // Pre-process and normalize any oklch color functions to safe RGB
    sanitizeColorsForExport(clone);
    try {
        const canvas = await html2canvas(clone, {
            scale: 2, // 2x retina scale for crisp vector-like text
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: 794,
            windowWidth: 794,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        // A4 dimensions in mm: 210 x 297
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        const pdfWidth = 210;
        const pageHeight = 297;
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        // First page
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        // Multi-page support if resume content exceeds 1 page
        while (heightLeft > 4) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
        pdf.save(cleanFilename);
    }
    finally {
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    }
}
export function triggerPrint() {
    window.print();
}
