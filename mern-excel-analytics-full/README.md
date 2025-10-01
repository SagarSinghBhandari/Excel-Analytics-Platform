# MERN Excel Analytics Platform (MVP)

## What is included
- **server/**: Express server with JWT auth, MongoDB models, multer upload, xlsx parsing.
- **client/**: Simple React + Vite app with login/register, upload, dashboard, and chart viewer (Chart.js).

## How to run locally
1. Install Node.js (>=18) and MongoDB.
2. In `server/` run:

   ```bash
   cd server
   npm install
   cp .env.example .env
   # update .env if needed
   npm run dev
   ```

3. In `client/` run:

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open the client (Vite will show the URL, usually http://localhost:5173) and use the app.

## Notes
- The server serves uploads from `/uploads` directory.
- This is an MVP. You can extend: add Redux, Tailwind, Three.js 3D charts, AI integration, chart downloads, admin panel, and deployment scripts.
