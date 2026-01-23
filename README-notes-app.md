# Notes Taking App

A simple, modern, and fully-functional note-taking application built with vanilla HTML, CSS, and JavaScript.

## Features

- ✅ Create, edit, and delete notes
- ✅ Search functionality to find notes quickly
- ✅ Local storage persistence (notes are saved automatically)
- ✅ Modern, responsive UI design
- ✅ Clean and intuitive interface
- ✅ Mobile-friendly

## Files

- `notes-app.html` - Main HTML structure
- `notes-app.css` - Styling and responsive design
- `notes-app.js` - Application logic and functionality
- `package.json` - Project configuration

## How to Run

### Option 1: Open directly in browser
Simply open `notes-app.html` in your web browser by double-clicking the file or dragging it into your browser window.

### Option 2: Using a local server
```bash
# Using Node.js http-server
npx http-server . -p 8080
# Then visit: http://localhost:8080/notes-app.html

# Using Python
python3 -m http.server 8080
# Then visit: http://localhost:8080/notes-app.html
```

## Usage

1. **Create a Note**: Click the "+ New Note" button
2. **Edit a Note**: Click on any existing note card
3. **Delete a Note**: Open a note and click the "Delete" button
4. **Search Notes**: Use the search bar to filter notes by title or content
5. **Automatic Save**: All notes are automatically saved to your browser's local storage

## Technical Details

- **No dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Local storage**: Notes persist across browser sessions
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean gradient design with smooth animations

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- LocalStorage API
- CSS Grid and Flexbox

Tested in Chrome, Firefox, Safari, and Edge.
