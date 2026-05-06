# CollabKart

CollabKart is a simple full-stack team task manager app.
It helps teams assign, track, and manage tasks with a clean frontend and a REST API backend.

## Features

- User login
- Dashboard with task stats
- Project management
- Role-based routing
- Separate backend and frontend folders

## Project Structure

- `backend/` - Node.js server, Express routes, models, auth, and DB connection
- `frontend/` - React app with pages for login, dashboard, and projects

## Run Locally

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

## Notes

- The frontend expects the backend API at `http://localhost:3000`
- If you use a different port, update the API requests in `frontend/src/pages`

## Future Improvements

- Add **Socket.IO** for real-time chat and live task updates
- Improve UI styling and mobile responsiveness
- Add notifications for task changes

## Future Socket.IO Plan

Later, we can add Socket.IO to support:

- Real-time chat between team members
- Live task status updates
- Instant notifications when tasks are created or updated

This will make CollabKart more interactive and collaborative.
