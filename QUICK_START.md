# Notes App - Quick Start Guide

## 🚀 Getting Started

### Access the App

**Option 1: Standalone (Easiest)**
```bash
cd /vercel/sandbox
python3 -m http.server 9000
```
Then open: `http://localhost:9000/notes-standalone.html`

**Option 2: Jekyll Integration**
```bash
cd /vercel/sandbox
bundle exec jekyll serve
```
Then open: `http://localhost:4000/notes.html`

## 📝 How to Use

### Creating Notes
1. Click the **"+ New Note"** button in the top right
2. Enter a title in the title field
3. Start typing your note content
4. Notes auto-save after 1 second of inactivity

### Editing Notes
1. Click on any note in the left sidebar
2. Edit the title or content
3. Changes are automatically saved

### Deleting Notes
1. Select a note
2. Click the 🗑️ (trash) icon in the editor header
3. Confirm deletion

### Searching Notes
1. Type in the search box at the top
2. Search works on both titles and content
3. Results update in real-time

### Filtering Notes
- **All Notes**: Shows all your notes
- **Recent**: Shows notes modified in the last 24 hours
- **Favorites**: Shows only favorited notes

### Marking Favorites
1. Select a note
2. Click the ☆ (star) icon in the editor header
3. Star turns gold (★) when favorited

### Theme Toggle
- Click the 🌙/☀️ button to switch between dark and light themes
- Your preference is saved automatically

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N` - Create new note
- `Ctrl/Cmd + F` - Focus search box
- `Ctrl/Cmd + S` - Manual save (auto-save is always active)

## 💾 Data Storage

- All notes are stored in your browser's localStorage
- Notes persist across browser sessions
- Maximum storage: ~5-10MB (browser dependent)
- Notes are NOT synced across devices

## 🎨 Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete  
✅ **Auto-Save** - Never lose your work  
✅ **Search** - Find notes quickly  
✅ **Filters** - Organize by recency or favorites  
✅ **Dark Mode** - Easy on the eyes  
✅ **Responsive** - Works on all devices  
✅ **Character Count** - Track note length  
✅ **No Backend Required** - Pure client-side app  

## 🔧 Troubleshooting

**Notes not saving?**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify localStorage is not disabled

**Can't see my notes?**
- Check if you're in the correct filter (All/Recent/Favorites)
- Try clearing the search box
- Refresh the page

**Theme not persisting?**
- Check browser privacy settings
- Ensure localStorage is enabled

## 📱 Mobile Usage

The app is fully responsive and works great on mobile devices:
- Sidebar and editor stack vertically on small screens
- Touch-friendly buttons and inputs
- Optimized for portrait and landscape modes

## 🎯 Tips

1. **Use descriptive titles** - Makes searching easier
2. **Favorite important notes** - Quick access via Favorites filter
3. **Use Recent filter** - Find what you worked on today
4. **Try dark mode** - Reduces eye strain in low light
5. **Keyboard shortcuts** - Speed up your workflow

## 📊 Current Status

✅ **Production Ready**  
✅ **Fully Tested**  
✅ **No Known Issues**  

---

**Need Help?** Check `NOTES_APP_README.md` for detailed documentation.
