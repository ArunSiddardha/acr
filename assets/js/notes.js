// Notes App JavaScript
class NotesApp {
    constructor() {
        this.notes = [];
        this.currentNoteId = null;
        this.autoSaveTimeout = null;

        this.init();
    }

    init() {
        this.loadNotes();
        this.setupEventListeners();
        this.renderNotesList();
    }

    setupEventListeners() {
        // New note button
        document.getElementById('newNoteBtn').addEventListener('click', () => {
            this.createNewNote();
        });

        // Save note button
        document.getElementById('saveNoteBtn').addEventListener('click', () => {
            this.saveCurrentNote();
        });

        // Delete note button
        document.getElementById('deleteNoteBtn').addEventListener('click', () => {
            this.deleteCurrentNote();
        });

        // Auto-save on input
        document.getElementById('noteTitle').addEventListener('input', () => {
            this.scheduleAutoSave();
        });

        document.getElementById('noteContent').addEventListener('input', () => {
            this.scheduleAutoSave();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchNotes(e.target.value);
        });
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes);
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    createNewNote() {
        const newNote = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.unshift(newNote);
        this.saveNotes();
        this.renderNotesList();
        this.openNote(newNote.id);
    }

    openNote(noteId) {
        this.currentNoteId = noteId;
        const note = this.notes.find(n => n.id === noteId);

        if (!note) return;

        // Show editor, hide empty state
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('editorArea').style.display = 'flex';

        // Populate editor
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;

        // Update last modified
        this.updateLastModified(note.updatedAt);

        // Update active state in list
        this.updateActiveNoteInList(noteId);
    }

    saveCurrentNote() {
        if (!this.currentNoteId) return;

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        note.title = document.getElementById('noteTitle').value || 'Untitled Note';
        note.content = document.getElementById('noteContent').value;
        note.updatedAt = new Date().toISOString();

        this.saveNotes();
        this.renderNotesList();
        this.updateLastModified(note.updatedAt);
        this.updateActiveNoteInList(this.currentNoteId);

        // Show save feedback
        const saveBtn = document.getElementById('saveNoteBtn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 1000);
    }

    deleteCurrentNote() {
        if (!this.currentNoteId) return;

        if (!confirm('Are you sure you want to delete this note?')) return;

        this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
        this.saveNotes();
        this.renderNotesList();

        // Close editor
        this.currentNoteId = null;
        document.getElementById('emptyState').style.display = 'flex';
        document.getElementById('editorArea').style.display = 'none';
    }

    scheduleAutoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveCurrentNote();
        }, 1000);
    }

    renderNotesList(notesToRender = this.notes) {
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        if (notesToRender.length === 0) {
            notesList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">No notes yet</div>';
            return;
        }

        notesToRender.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            if (note.id === this.currentNoteId) {
                noteItem.classList.add('active');
            }

            const title = note.title || 'Untitled Note';
            const preview = note.content.substring(0, 60) || 'No content';
            const date = this.formatDate(note.updatedAt);

            noteItem.innerHTML = `
                <div class="note-item-title">${this.escapeHtml(title)}</div>
                <div class="note-item-preview">${this.escapeHtml(preview)}${note.content.length > 60 ? '...' : ''}</div>
                <div class="note-item-date">${date}</div>
            `;

            noteItem.addEventListener('click', () => {
                this.openNote(note.id);
            });

            notesList.appendChild(noteItem);
        });
    }

    updateActiveNoteInList(noteId) {
        const noteItems = document.querySelectorAll('.note-item');
        noteItems.forEach((item, index) => {
            if (this.notes[index] && this.notes[index].id === noteId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    searchNotes(query) {
        if (!query.trim()) {
            this.renderNotesList();
            return;
        }

        const filtered = this.notes.filter(note => {
            return note.title.toLowerCase().includes(query.toLowerCase()) ||
                   note.content.toLowerCase().includes(query.toLowerCase());
        });

        this.renderNotesList(filtered);
    }

    updateLastModified(dateString) {
        const lastModified = document.getElementById('lastModified');
        lastModified.textContent = `Last modified: ${this.formatDate(dateString)}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NotesApp();
    });
} else {
    new NotesApp();
}
