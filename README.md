# Education Coaching Centre — Deepanshu Sir (Website + Backend)

This project contains the public coaching website and a starter learning portal with a Node.js/Express backend.

## Features included
- Public coaching website and supplied gallery images.
- Student/teacher registration and login; admin login configured on the server.
- Role-based API access (student, teacher, admin), hashed passwords and JWT sessions.
- Dashboard counts and announcements.
- AI question-photo solver and AI MCQ question generator using Google Gemini API, called only from the backend.
- Teachers can publish online tests; students submit answers, receive scores, and view rankings.
- Attendance check-in with date/time logs; teacher/admin can record or correct attendance.
- Live-class timetable and meeting-room links (Jitsi link generated when a custom URL is not provided).
- PDF/image study-material uploads.
- Admin user list and role management.
- JSON data store for easy beginner setup.

## Run locally
1. Install Node.js 18 or newer from https://nodejs.org/.
2. Extract this project ZIP and open a terminal in the extracted folder.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Edit `.env`: set a long random `JWT_SECRET`, a strong `ADMIN_PASSWORD`, and your own `GEMINI_API_KEY`.
6. Run `npm start`.
7. Open `http://localhost:3000` for the public website and `http://localhost:3000/portal` for the login portal.

## Admin login
The first admin account is created from `.env` at first server start. Defaults in `.env.example` are examples only; change `ADMIN_EMAIL` and `ADMIN_PASSWORD` before starting the server. If you start without changing the example password, do not expose the app to the internet.

## Gemini API key setup
1. Create/get a key in Google AI Studio: https://aistudio.google.com/app/apikey
2. Put it in `.env` as `GEMINI_API_KEY=your_real_key`.
3. Restart the server. The key stays on the server; it is never embedded in browser JavaScript.

I cannot provide or invent a real private AI API key. You must create your own key and follow the provider's terms, limits and billing settings. AI calls may not be free forever.

## Deployment notes — read before public launch
- Deploy this as a Node.js web service, not as a static-only GitHub Pages site. A static host cannot run `server.js`.
- Use a host with persistent storage or replace the JSON store with a managed database (e.g. PostgreSQL/Supabase) before relying on real student data. Ephemeral server storage can lose records on redeploy.
- Set environment variables in the host dashboard. Never upload `.env`, API keys, passwords, student data, or `data/db.json` to a public repository.
- Add HTTPS, rate limiting, email verification/password reset, backups, privacy policy/parental consent, moderation and abuse controls before production use.
- Current upload limit is 8 MB per PDF/image; uploaded files are stored in `uploads/`.
- Live classes use meeting links (Jitsi by default). Recording is not automatically enabled by this starter; use a meeting provider with recording support and appropriate consent/storage controls.
- Attendance is recorded when a student checks in through the portal or a teacher/admin records it. A website cannot silently verify physical presence or track a student's phone in the background. For reliable class attendance, connect a proper meeting webhook or teacher-controlled QR/OTP check-in.
- The current JSON database is a beginner prototype, not intended for large-scale concurrent production use. Upgrade to a database before real-world launch.
- Do not use ads to target children or share student information with ad networks without appropriate legal/privacy review. This starter does not insert ads.

## Main files
- `index.html`, `style.css`, `script.js`: public site
- `portal.html`, `portal.css`, `portal.js`: login and learning portal UI
- `server.js`: API/backend
- `.env.example`: environment variable template
- `assets/`: supplied photos/poster
- `data/db.json`: created automatically on first run
