// Notes App JavaScript
class NotesApp {
    constructor() {
        this.notes = [];
        this.currentNoteId = null;
        this.init();
    }

    init() {
        // Load notes from localStorage
        this.loadNotes();

        // Set up event listeners
        this.setupEventListeners();

        // Render initial notes list
        this.renderNotesList();
    }

    setupEventListeners() {
        // Add new note button
        document.getElementById('addNoteBtn').addEventListener('click', () => {
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

        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchNotes(e.target.value);
        });

        // Auto-save on title/body change (debounced)
        let autoSaveTimeout;
        const autoSave = () => {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                if (this.currentNoteId) {
                    this.saveCurrentNote(true);
                }
            }, 1000);
        };

        document.getElementById('noteTitle').addEventListener('input', autoSave);
        document.getElementById('noteBody').addEventListener('input', autoSave);
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
            id: Date.now().toString(),
            title: 'Untitled Note',
            body: '',
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
        document.getElementById('editorContent').style.display = 'flex';

        // Populate editor
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteBody').value = note.body;

        // Update meta info
        const lastEdited = new Date(note.updatedAt).toLocaleString();
        document.getElementById('noteMeta').textContent = `Last edited: ${lastEdited}`;

        // Update active state in list
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.noteId === noteId) {
                item.classList.add('active');
            }
        });

        // Focus on title
        document.getElementById('noteTitle').focus();
    }

    saveCurrentNote(silent = false) {
        if (!this.currentNoteId) return;

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        const title = document.getElementById('noteTitle').value.trim() || 'Untitled Note';
        const body = document.getElementById('noteBody').value;

        note.title = title;
        note.body = body;
        note.updatedAt = new Date().toISOString();

        this.saveNotes();
        this.renderNotesList();

        // Update active state
        const activeItem = document.querySelector(`.note-item[data-note-id="${this.currentNoteId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Update meta
        const lastEdited = new Date(note.updatedAt).toLocaleString();
        document.getElementById('noteMeta').textContent = `Last edited: ${lastEdited}`;

        if (!silent) {
            // Show saved feedback
            const saveBtn = document.getElementById('saveNoteBtn');
            const originalText = saveBtn.textContent;
            saveBtn.textContent = 'Saved!';
            saveBtn.style.backgroundColor = '#218838';
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.backgroundColor = '';
            }, 1500);
        }
    }

    deleteCurrentNote() {
        if (!this.currentNoteId) return;

        if (!confirm('Are you sure you want to delete this note?')) return;

        this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
        this.saveNotes();
        this.currentNoteId = null;

        // Clear editor
        document.getElementById('emptyState').style.display = 'flex';
        document.getElementById('editorContent').style.display = 'none';

        this.renderNotesList();
    }

    renderNotesList(notesToRender = this.notes) {
        const notesList = document.getElementById('notesList');

        if (notesToRender.length === 0) {
            notesList.innerHTML = '<div class="no-notes">No notes found</div>';
            return;
        }

        notesList.innerHTML = notesToRender.map(note => {
            const preview = note.body.substring(0, 100) || 'No content';
            const date = new Date(note.updatedAt).toLocaleDateString();
            const isActive = note.id === this.currentNoteId ? 'active' : '';

            return `
                <div class="note-item ${isActive}" data-note-id="${note.id}">
                    <div class="note-item-title">${this.escapeHtml(note.title)}</div>
                    <div class="note-item-preview">${this.escapeHtml(preview)}</div>
                    <div class="note-item-date">${date}</div>
                </div>
            `;
        }).join('');

        // Add click listeners to note items
        document.querySelectorAll('.note-item').forEach(item => {
            item.addEventListener('click', () => {
                this.openNote(item.dataset.noteId);
            });
        });
    }

    searchNotes(query) {
        if (!query.trim()) {
            this.renderNotesList();
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = this.notes.filter(note =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.body.toLowerCase().includes(lowerQuery)
        );

        this.renderNotesList(filtered);
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
