// Note-taking app logic
class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.currentNoteId = null;
        this.autoSaveTimeout = null;
        
        this.initElements();
        this.initEventListeners();
        this.renderNotesList();
    }

    initElements() {
        this.newNoteBtn = document.getElementById('newNoteBtn');
        this.notesList = document.getElementById('notesList');
        this.searchInput = document.getElementById('searchInput');
        this.emptyState = document.getElementById('emptyState');
        this.editorContainer = document.getElementById('editorContainer');
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.deleteBtn = document.getElementById('deleteBtn');
        this.charCount = document.getElementById('charCount');
        this.lastSaved = document.getElementById('lastSaved');
    }

    initEventListeners() {
        this.newNoteBtn.addEventListener('click', () => this.createNewNote());
        this.deleteBtn.addEventListener('click', () => this.deleteCurrentNote());
        this.searchInput.addEventListener('input', (e) => this.searchNotes(e.target.value));
        
        this.noteTitle.addEventListener('input', () => {
            this.scheduleAutoSave();
        });
        
        this.noteContent.addEventListener('input', () => {
            this.updateCharCount();
            this.scheduleAutoSave();
        });
    }

    loadNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
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

        this.emptyState.style.display = 'none';
        this.editorContainer.style.display = 'flex';
        
        this.noteTitle.value = note.title;
        this.noteContent.value = note.content;
        this.updateCharCount();
        this.updateLastSaved(note.updatedAt);
        
        this.renderNotesList();
        this.noteTitle.focus();
    }

    saveCurrentNote() {
        if (!this.currentNoteId) return;

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        note.title = this.noteTitle.value.trim() || 'Untitled Note';
        note.content = this.noteContent.value;
        note.updatedAt = new Date().toISOString();

        this.saveNotes();
        this.renderNotesList();
        this.updateLastSaved(note.updatedAt);
    }

    scheduleAutoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveCurrentNote();
        }, 500);
    }

    deleteCurrentNote() {
        if (!this.currentNoteId) return;

        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
            this.saveNotes();
            this.currentNoteId = null;
            this.emptyState.style.display = 'flex';
            this.editorContainer.style.display = 'none';
            this.renderNotesList();
        }
    }

    searchNotes(query) {
        const filteredNotes = query.trim() === '' 
            ? this.notes 
            : this.notes.filter(note => 
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.content.toLowerCase().includes(query.toLowerCase())
            );
        
        this.renderNotesList(filteredNotes);
    }

    renderNotesList(notesToRender = this.notes) {
        this.notesList.innerHTML = '';

        if (notesToRender.length === 0) {
            this.notesList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">No notes found</div>';
            return;
        }

        notesToRender.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            if (note.id === this.currentNoteId) {
                noteItem.classList.add('active');
            }

            const title = note.title || 'Untitled Note';
            const preview = note.content.substring(0, 50) || 'No content';
            const date = this.formatDate(note.updatedAt);

            noteItem.innerHTML = `
                <div class="note-item-title">${this.escapeHtml(title)}</div>
                <div class="note-item-preview">${this.escapeHtml(preview)}</div>
                <div class="note-item-date">${date}</div>
            `;

            noteItem.addEventListener('click', () => this.openNote(note.id));
            this.notesList.appendChild(noteItem);
        });
    }

    updateCharCount() {
        const count = this.noteContent.value.length;
        this.charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
    }

    updateLastSaved(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        let timeAgo;
        if (diffMins < 1) {
            timeAgo = 'Just now';
        } else if (diffMins < 60) {
            timeAgo = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else {
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) {
                timeAgo = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            } else {
                timeAgo = date.toLocaleDateString();
            }
        }

        this.lastSaved.textContent = `Last saved: ${timeAgo}`;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});

