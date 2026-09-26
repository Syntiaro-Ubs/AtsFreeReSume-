# Resume Maker API

The Express API runs separately from the Vite frontend on port 5000. From the project root, start it with `npm run dev:backend`; start Vite in another terminal with `npm run dev:frontend`. Vite forwards `/api` requests to the backend.

Copy `backend/.env.example` to `backend/.env` and set the MySQL and JWT values there. The API also reads the root `.env` for the server-only OpenAI key when it is not set in `backend/.env`.

The existing MySQL schema was inspected and retained. The database was missing storage used by the current editor, so `migrations/001_resume_builder_fields.sql` was applied additively: it adds exact date labels and project role columns, and creates child bullet tables with cascading foreign keys. Existing table rows were not rewritten. Do not apply this one-time migration again to a database where it has already been applied.

The React app sends its existing aggregate resume format to the API. The backend maps it into the existing normalized MySQL tables and reconstructs the same shape on reads. Section-level routes are also available under `/api/resumes/:id/:section`.

Useful unauthenticated endpoints:

- `GET /api/health`
- `GET /api/test-db`
