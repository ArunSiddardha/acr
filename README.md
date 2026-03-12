# Local Notes App

A lightweight, offline-first notes app that runs entirely in the browser. No backend, no installs. Data is stored in `localStorage`.

Getting Started
- Open `app/notes/index.html` in a browser.
- Optionally, open `notes.html` (redirects to the app path).

Features
- Create, edit, pin, and delete notes
- Instant search and sorting (Updated, Created, Title)
- Autosave to `localStorage`
- Export/Import notes as JSON
- Keyboard: `Ctrl/⌘+F` to focus search, `N` or `Ctrl/⌘+N` to create

Files
- `app/notes/index.html` — Main UI
- `app/notes/styles.css` — Styles (dark theme)
- `app/notes/script.js` — CRUD, search, sort, pin, storage

Data
- Stored under the key `notes.v1` in the browser's `localStorage`.

Notes
- Everything is local to the current browser/device. No sync.
