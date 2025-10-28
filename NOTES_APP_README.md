# Note Taking App

A modern, fully-functional note-taking application built with vanilla JavaScript, HTML, and CSS.

## Features

- Create, edit, and delete notes
- Search through notes by title or content
- Persistent storage using localStorage
- Clean and responsive design
- Keyboard shortcuts for faster note-taking
- Real-time note count
- Timestamps for creation and updates
- Beautiful gradient UI with smooth animations

## How to Use

1. Open `notes.html` in your web browser
2. Create a new note by entering a title and content, then click "Add Note"
3. Search for notes using the search bar at the top
4. Click "Edit" on any note to modify it
5. Click "Delete" to remove a note (with confirmation)

## Keyboard Shortcuts

- `Ctrl + Enter` - Save note (add or update)
- `Escape` - Cancel editing mode

## File Structure

```
notes.html                    - Main HTML file
assets/css/notes-style.css    - Styling
assets/js/notes-app.js        - Application logic
```

## Technical Details

- No dependencies or frameworks required
- Data persists in browser localStorage
- Responsive design works on desktop and mobile
- XSS protection with HTML escaping
- Modern ES6+ JavaScript with class-based architecture

## Access the App

Simply open the file in your browser:
- Direct path: `file:///path/to/notes.html`
- Or serve with any local web server

Enjoy taking notes!
