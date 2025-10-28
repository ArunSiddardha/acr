// Note Taking App JavaScript

class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.editingNoteId = null;
        this.initializeElements();
        this.attachEventListeners();
        this.renderNotes();
    }

    initializeElements() {
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.addNoteBtn = document.getElementById('addNoteBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.searchInput = document.getElementById('searchInput');
        this.notesContainer = document.getElementById('notesContainer');
        this.emptyState = document.getElementById('emptyState');
    }

    attachEventListeners() {
        this.addNoteBtn.addEventListener('click', () => this.addOrUpdateNote());
        this.clearBtn.addEventListener('click', () => this.clearInputs());
        this.searchInput.addEventListener('input', (e) => this.searchNotes(e.target.value));

        // Allow Enter key to add note (Ctrl+Enter for textarea)
        this.noteTitle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addOrUpdateNote();
            }
        });
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    addOrUpdateNote() {
        const title = this.noteTitle.value.trim();
        const content = this.noteContent.value.trim();

        if (!title && !content) {
            alert('Please enter a title or content for your note');
            return;
        }

        if (this.editingNoteId !== null) {
            // Update existing note
            const noteIndex = this.notes.findIndex(note => note.id === this.editingNoteId);
            if (noteIndex !== -1) {
                this.notes[noteIndex].title = title || 'Untitled';
                this.notes[noteIndex].content = content;
                this.notes[noteIndex].updatedAt = new Date().toISOString();
            }
            this.editingNoteId = null;
            this.addNoteBtn.textContent = 'Add Note';
        } else {
            // Create new note
            const newNote = {
                id: Date.now(),
                title: title || 'Untitled',
                content: content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.notes.unshift(newNote);
        }

        this.saveNotes();
        this.clearInputs();
        this.renderNotes();
    }

    editNote(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            this.noteTitle.value = note.title === 'Untitled' ? '' : note.title;
            this.noteContent.value = note.content;
            this.editingNoteId = id;
            this.addNoteBtn.textContent = 'Update Note';
            this.noteTitle.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveNotes();
            this.renderNotes();

            // Clear inputs if we were editing this note
            if (this.editingNoteId === id) {
                this.clearInputs();
            }
        }
    }

    clearInputs() {
        this.noteTitle.value = '';
        this.noteContent.value = '';
        this.editingNoteId = null;
        this.addNoteBtn.textContent = 'Add Note';
    }

    searchNotes(searchTerm) {
        const filteredNotes = this.notes.filter(note => {
            const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
            const contentMatch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
            return titleMatch || contentMatch;
        });
        this.renderNotes(filteredNotes);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today, ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Yesterday, ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays < 7) {
            return diffDays + ' days ago';
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }

    renderNotes(notesToRender = this.notes) {
        this.notesContainer.innerHTML = '';

        if (notesToRender.length === 0) {
            this.emptyState.classList.add('show');
            return;
        } else {
            this.emptyState.classList.remove('show');
        }

        notesToRender.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <h3>${this.escapeHtml(note.title)}</h3>
                <div class="note-date">${this.formatDate(note.updatedAt)}</div>
                <p>${this.escapeHtml(note.content)}</p>
                <div class="note-actions">
                    <button class="edit-btn" onclick="app.editNote(${note.id})">Edit</button>
                    <button class="delete-btn" onclick="app.deleteNote(${note.id})">Delete</button>
                </div>
            `;
            this.notesContainer.appendChild(noteCard);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NotesApp();
});
