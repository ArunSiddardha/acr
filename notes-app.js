class NotesApp {
    constructor() {
        this.notes = [];
        this.currentNoteId = null;
        this.init();
    }

    init() {
        this.loadNotes();
        this.setupEventListeners();
        this.renderNotes();
    }

    setupEventListeners() {
        // Add Note Button
        document.getElementById('addNoteBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Close Modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Cancel Button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Save Note Button
        document.getElementById('saveNoteBtn').addEventListener('click', () => {
            this.saveNote();
        });

        // Delete Note Button
        document.getElementById('deleteNoteBtn').addEventListener('click', () => {
            this.deleteNote();
        });

        // Search Input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchNotes(e.target.value);
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('noteModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    openModal(noteId = null) {
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('modalTitle');
        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');
        const deleteBtn = document.getElementById('deleteNoteBtn');

        this.currentNoteId = noteId;

        if (noteId) {
            const note = this.notes.find(n => n.id === noteId);
            if (note) {
                modalTitle.textContent = 'Edit Note';
                noteTitle.value = note.title;
                noteContent.value = note.content;
                deleteBtn.style.display = 'block';
            }
        } else {
            modalTitle.textContent = 'New Note';
            noteTitle.value = '';
            noteContent.value = '';
            deleteBtn.style.display = 'none';
        }

        modal.style.display = 'block';
        noteTitle.focus();
    }

    closeModal() {
        const modal = document.getElementById('noteModal');
        modal.style.display = 'none';
        this.currentNoteId = null;
    }

    saveNote() {
        const noteTitle = document.getElementById('noteTitle').value.trim();
        const noteContent = document.getElementById('noteContent').value.trim();

        if (!noteTitle && !noteContent) {
            alert('Please enter a title or content for your note.');
            return;
        }

        if (this.currentNoteId) {
            // Update existing note
            const note = this.notes.find(n => n.id === this.currentNoteId);
            if (note) {
                note.title = noteTitle || 'Untitled';
                note.content = noteContent;
                note.lastModified = new Date().toISOString();
            }
        } else {
            // Create new note
            const newNote = {
                id: Date.now(),
                title: noteTitle || 'Untitled',
                content: noteContent,
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString()
            };
            this.notes.unshift(newNote);
        }

        this.saveToLocalStorage();
        this.renderNotes();
        this.closeModal();
    }

    deleteNote() {
        if (!this.currentNoteId) return;

        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
            this.saveToLocalStorage();
            this.renderNotes();
            this.closeModal();
        }
    }

    searchNotes(query) {
        const searchQuery = query.toLowerCase().trim();

        if (!searchQuery) {
            this.renderNotes();
            return;
        }

        const filteredNotes = this.notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery)
        );

        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        const notesGrid = document.getElementById('notesGrid');
        notesGrid.innerHTML = '';

        if (notesToRender.length === 0) {
            notesGrid.innerHTML = `
                <div class="empty-state">
                    <h2>No notes yet</h2>
                    <p>Click "New Note" to create your first note!</p>
                </div>
            `;
            return;
        }

        notesToRender.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.addEventListener('click', () => this.openModal(note.id));

            const date = new Date(note.lastModified);
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            noteCard.innerHTML = `
                <h3>${this.escapeHtml(note.title)}</h3>
                <p>${this.escapeHtml(note.content)}</p>
                <div class="note-date">${formattedDate}</div>
            `;

            notesGrid.appendChild(noteCard);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        const storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            try {
                this.notes = JSON.parse(storedNotes);
            } catch (error) {
                console.error('Error loading notes:', error);
                this.notes = [];
            }
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});
