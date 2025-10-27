// Note Taking App JavaScript

class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.currentEditId = null;
        this.initializeElements();
        this.attachEventListeners();
        this.renderNotes();
    }

    initializeElements() {
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.addNoteBtn = document.getElementById('addNoteBtn');
        this.notesContainer = document.getElementById('notesContainer');
        this.emptyState = document.getElementById('emptyState');
        this.searchInput = document.getElementById('searchInput');
        this.editModal = document.getElementById('editModal');
        this.editNoteTitle = document.getElementById('editNoteTitle');
        this.editNoteContent = document.getElementById('editNoteContent');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.closeModal = document.querySelector('.close');
    }

    attachEventListeners() {
        this.addNoteBtn.addEventListener('click', () => this.addNote());
        this.searchInput.addEventListener('input', (e) => this.searchNotes(e.target.value));
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
        this.closeModal.addEventListener('click', () => this.closeEditModal());

        // Close modal when clicking outside
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });

        // Allow Enter key to add note (Ctrl+Enter in textarea)
        this.noteContent.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.addNote();
            }
        });

        this.noteTitle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.noteContent.focus();
            }
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addNote() {
        const title = this.noteTitle.value.trim();
        const content = this.noteContent.value.trim();

        if (!title && !content) {
            this.showNotification('Please enter a title or content for your note', 'error');
            return;
        }

        const note = {
            id: this.generateId(),
            title: title || 'Untitled Note',
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.unshift(note);
        this.saveNotes();
        this.renderNotes();
        this.clearInputs();
        this.showNotification('Note added successfully!', 'success');
    }

    editNote(id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            this.currentEditId = id;
            this.editNoteTitle.value = note.title;
            this.editNoteContent.value = note.content;
            this.openEditModal();
        }
    }

    saveEdit() {
        const title = this.editNoteTitle.value.trim();
        const content = this.editNoteContent.value.trim();

        if (!title && !content) {
            this.showNotification('Please enter a title or content for your note', 'error');
            return;
        }

        const noteIndex = this.notes.findIndex(n => n.id === this.currentEditId);
        if (noteIndex !== -1) {
            this.notes[noteIndex].title = title || 'Untitled Note';
            this.notes[noteIndex].content = content;
            this.notes[noteIndex].updatedAt = new Date().toISOString();
            this.saveNotes();
            this.renderNotes();
            this.closeEditModal();
            this.showNotification('Note updated successfully!', 'success');
        }
    }

    deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== id);
            this.saveNotes();
            this.renderNotes();
            this.showNotification('Note deleted successfully!', 'success');
        }
    }

    searchNotes(query) {
        const filteredNotes = this.notes.filter(note => {
            const searchText = query.toLowerCase();
            return note.title.toLowerCase().includes(searchText) ||
                   note.content.toLowerCase().includes(searchText);
        });
        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        this.notesContainer.innerHTML = '';

        if (notesToRender.length === 0) {
            this.emptyState.classList.add('show');
            return;
        }

        this.emptyState.classList.remove('show');

        notesToRender.forEach(note => {
            const noteCard = this.createNoteCard(note);
            this.notesContainer.appendChild(noteCard);
        });
    }

    createNoteCard(note) {
        const card = document.createElement('div');
        card.className = 'note-card';

        const date = new Date(note.updatedAt);
        const formattedDate = this.formatDate(date);

        card.innerHTML = `
            <div class="note-header">
                <div class="note-title">${this.escapeHtml(note.title)}</div>
                <div class="note-actions">
                    <button class="edit-btn" data-id="${note.id}" title="Edit note">✏️</button>
                    <button class="delete-btn" data-id="${note.id}" title="Delete note">🗑️</button>
                </div>
            </div>
            <div class="note-date">${formattedDate}</div>
            <div class="note-content">${this.escapeHtml(note.content).substring(0, 200)}${note.content.length > 200 ? '...' : ''}</div>
        `;

        // Attach event listeners
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.editNote(note.id);
        });

        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteNote(note.id);
        });

        // Click on card to edit
        card.addEventListener('click', () => {
            this.editNote(note.id);
        });

        return card;
    }

    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'Just now';
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearInputs() {
        this.noteTitle.value = '';
        this.noteContent.value = '';
        this.noteTitle.focus();
    }

    openEditModal() {
        this.editModal.classList.add('show');
        this.editNoteTitle.focus();
    }

    closeEditModal() {
        this.editModal.classList.remove('show');
        this.currentEditId = null;
        this.editNoteTitle.value = '';
        this.editNoteContent.value = '';
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});
