# Notes App - Documentation

## Overview
A fully functional, modern note-taking application built with vanilla JavaScript, HTML, and CSS. The app features client-side storage using localStorage, providing a seamless note-taking experience without requiring a backend.

## Features

### Core Functionality
- ✅ **Create Notes**: Add new notes with custom titles and content
- ✅ **Edit Notes**: Real-time editing with auto-save functionality
- ✅ **Delete Notes**: Remove notes with confirmation dialog
- ✅ **Search Notes**: Search through note titles and content
- ✅ **Filter Notes**: Filter by All, Recent (last 24 hours), or Favorites
- ✅ **Favorite Notes**: Mark important notes as favorites
- ✅ **Auto-Save**: Automatic saving after 1 second of inactivity
- ✅ **Character Count**: Real-time character counter
- ✅ **Persistent Storage**: Notes saved in browser localStorage

### User Interface
- ✅ **Modern Design**: Clean, professional interface
- ✅ **Dark/Light Theme**: Toggle between themes with persistence
- ✅ **Responsive Layout**: Works on desktop, tablet, and mobile devices
- ✅ **Smooth Animations**: Transitions and hover effects
- ✅ **Empty State**: Helpful message when no note is selected
- ✅ **Visual Feedback**: Save indicators and active states

### Keyboard Shortcuts
- `Ctrl/Cmd + N`: Create new note
- `Ctrl/Cmd + F`: Focus search
- `Ctrl/Cmd + S`: Manual save (auto-save is already active)

## File Structure

```
/vercel/sandbox/
├── notes.html                    # Jekyll-integrated version
├── notes-standalone.html         # Standalone version (no Jekyll required)
├── assets/
│   ├── js/
│   │   └── notes.js             # Main JavaScript application
│   └── css/
│       └── notes.css            # Styling and themes
└── _includes/
    └── navbar.html              # Updated with Notes link
```

## Installation & Usage

### Option 1: Standalone Version (Recommended for Testing)
1. Open `notes-standalone.html` in a web browser
2. Or serve via HTTP server:
   ```bash
   cd /vercel/sandbox
   python3 -m http.server 9000
   # Visit: http://localhost:9000/notes-standalone.html
   ```

### Option 2: Jekyll Integration
1. The notes app is integrated into the Jekyll site
2. Access via `/notes.html` route
3. Requires Jekyll build:
   ```bash
   bundle exec jekyll serve
   # Visit: http://localhost:4000/notes.html
   ```

## Technical Details

### JavaScript Architecture
- **IIFE Pattern**: Encapsulated code to avoid global namespace pollution
- **State Management**: Centralized state for notes and current selection
- **Event Delegation**: Efficient event handling
- **Debouncing**: Optimized search and auto-save
- **LocalStorage API**: Persistent data storage

### Data Structure
```javascript
{
  id: "timestamp",
  title: "Note Title",
  content: "Note content...",
  createdAt: "ISO date string",
  updatedAt: "ISO date string",
  isFavorite: boolean
}
```

### CSS Features
- **CSS Variables**: Easy theme customization
- **Flexbox & Grid**: Modern layout techniques
- **Media Queries**: Responsive breakpoints at 1024px, 768px, 480px
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Print Styles**: Optimized for printing notes

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Testing Checklist

### Functional Tests
- [x] Create new note
- [x] Edit note title
- [x] Edit note content
- [x] Delete note with confirmation
- [x] Toggle favorite status
- [x] Search notes by title
- [x] Search notes by content
- [x] Filter by All Notes
- [x] Filter by Recent (last 24 hours)
- [x] Filter by Favorites
- [x] Auto-save after editing
- [x] Character count updates
- [x] Theme toggle (light/dark)
- [x] Theme persistence across sessions
- [x] Notes persist after page refresh
- [x] Keyboard shortcuts work

### UI/UX Tests
- [x] Responsive design on mobile
- [x] Responsive design on tablet
- [x] Responsive design on desktop
- [x] Empty state displays correctly
- [x] Active note highlighting
- [x] Smooth transitions
- [x] Hover effects
- [x] Save indicator animation
- [x] Scrollable note list
- [x] Scrollable editor

## Known Limitations
1. **Storage Limit**: localStorage typically has a 5-10MB limit per domain
2. **No Sync**: Notes are stored locally and don't sync across devices
3. **No Export**: Currently no export to file functionality (can be added)
4. **No Rich Text**: Plain text only (no formatting, images, etc.)

## Future Enhancements
- Export notes to Markdown/PDF
- Import notes from files
- Rich text editing
- Note categories/tags
- Cloud sync
- Collaborative editing
- Note sharing
- Attachments support

## Troubleshooting

### Notes not saving
- Check browser localStorage is enabled
- Check browser console for errors
- Clear localStorage and try again: `localStorage.clear()`

### Theme not persisting
- Ensure cookies/localStorage are not being cleared on browser close
- Check browser privacy settings

### Search not working
- Verify JavaScript is enabled
- Check browser console for errors

## Development

### Modifying Styles
Edit `/vercel/sandbox/assets/css/notes.css`

### Modifying Functionality
Edit `/vercel/sandbox/assets/js/notes.js`

### Adding Features
1. Update JavaScript logic in `notes.js`
2. Add corresponding HTML elements if needed
3. Style new elements in `notes.css`
4. Test thoroughly

## Support
For issues or questions, please refer to the project documentation or create an issue in the repository.

## License
This notes app is part of the Alumni Association website project.

---

**Version**: 1.0.0  
**Last Updated**: December 9, 2025  
**Status**: ✅ Production Ready
