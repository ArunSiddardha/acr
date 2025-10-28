class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.currentNoteId = null;
        this.saveTimeout = null;

        this.initElements();
        this.attachEventListeners();
        this.renderNotesList();
    }

    initElements() {
        this.newNoteBtn = document.getElementById('newNoteBtn');
        this.searchInput = document.getElementById('searchInput');
        this.notesList = document.getElementById('notesList');
        this.emptyState = document.getElementById('emptyState');
        this.editorContainer = document.getElementById('editorContainer');
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.deleteNoteBtn = document.getElementById('deleteNoteBtn');
        this.lastSaved = document.getElementById('lastSaved');
        this.charCount = document.getElementById('charCount');
    }

    attachEventListeners() {
        this.newNoteBtn.addEventListener('click', () => this.createNewNote());
        this.searchInput.addEventListener('input', (e) => this.searchNotes(e.target.value));
        this.noteTitle.addEventListener('input', () => this.handleNoteChange());
        this.noteContent.addEventListener('input', () => this.handleNoteChange());
        this.deleteNoteBtn.addEventListener('click', () => this.deleteCurrentNote());
    }

    loadNotes() {
        const stored = localStorage.getItem('notes');
        return stored ? JSON.parse(stored) : [];
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
        this.selectNote(newNote.id);
    }

    selectNote(noteId) {
        this.currentNoteId = noteId;
        const note = this.notes.find(n => n.id === noteId);

        if (note) {
            this.noteTitle.value = note.title;
            this.noteContent.value = note.content;
            this.updateCharCount();
            this.showEditor();
            this.updateActiveNoteInList();
        }
    }

    handleNoteChange() {
        if (!this.currentNoteId) return;

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        note.title = this.noteTitle.value || 'Untitled Note';
        note.content = this.noteContent.value;
        note.updatedAt = new Date().toISOString();

        this.updateCharCount();
        this.showSavingIndicator();

        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.saveNotes();
            this.renderNotesList();
            this.updateActiveNoteInList();
            this.showSavedIndicator();
        }, 500);
    }

    deleteCurrentNote() {
        if (!this.currentNoteId) return;

        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
            this.saveNotes();
            this.currentNoteId = null;
            this.renderNotesList();
            this.hideEditor();
        }
    }

    searchNotes(query) {
        const filtered = this.notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        this.renderNotesList(filtered);
    }

    renderNotesList(notesToRender = this.notes) {
        if (notesToRender.length === 0) {
            this.notesList.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 20px;">No notes found</div>';
            return;
        }

        this.notesList.innerHTML = notesToRender.map(note => {
            const preview = note.content.substring(0, 60) || 'No content';
            const date = this.formatDate(note.updatedAt);
            const isActive = note.id === this.currentNoteId ? 'active' : '';

            return `
                <div class="note-item ${isActive}" data-note-id="${note.id}">
                    <div class="note-item-title">${this.escapeHtml(note.title)}</div>
                    <div class="note-item-preview">${this.escapeHtml(preview)}</div>
                    <div class="note-item-date">${date}</div>
                </div>
            `;
        }).join('');

        this.notesList.querySelectorAll('.note-item').forEach(item => {
            item.addEventListener('click', () => {
                const noteId = parseInt(item.dataset.noteId);
                this.selectNote(noteId);
            });
        });
    }

    updateActiveNoteInList() {
        this.notesList.querySelectorAll('.note-item').forEach(item => {
            const noteId = parseInt(item.dataset.noteId);
            if (noteId === this.currentNoteId) {
                item.classList.add('active');
                const note = this.notes.find(n => n.id === noteId);
                if (note) {
                    item.querySelector('.note-item-title').textContent = note.title;
                    const preview = note.content.substring(0, 60) || 'No content';
                    item.querySelector('.note-item-preview').textContent = preview;
                }
            } else {
                item.classList.remove('active');
            }
        });
    }

    showEditor() {
        this.emptyState.style.display = 'none';
        this.editorContainer.classList.remove('hidden');
    }

    hideEditor() {
        this.emptyState.style.display = 'flex';
        this.editorContainer.classList.add('hidden');
    }

    updateCharCount() {
        const count = this.noteContent.value.length;
        this.charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
    }

    showSavingIndicator() {
        this.lastSaved.textContent = 'Saving...';
        this.lastSaved.style.color = '#a0aec0';
    }

    showSavedIndicator() {
        this.lastSaved.textContent = 'All changes saved';
        this.lastSaved.style.color = '#48bb78';
        setTimeout(() => {
            this.lastSaved.style.color = '#718096';
        }, 2000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

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

document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});
