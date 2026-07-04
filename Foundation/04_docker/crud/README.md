# Simple CRUD App

This project contains a separate frontend and backend for a basic CRUD application.

## Structure

- backend/: Express API for create, read, update, and delete operations
- frontend/: Plain HTML/CSS/JavaScript UI for interacting with the API

## Run locally

1. Install backend dependencies:
   - `cd backend && python3 -m pip install -r requirements.txt`
2. Start the backend:
   - `python3 app.py`
3. Serve the frontend from the project root:
   - `python3 -m http.server 3000 --directory frontend`
4. Open http://localhost:3000 in your browser.
