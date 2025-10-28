// Notes App - Main JavaScript

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
        this.updateNoteBtn = document.getElementById('updateNoteBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.searchInput = document.getElementById('searchInput');
        this.notesContainer = document.getElementById('notesContainer');
        this.emptyState = document.getElementById('emptyState');
        this.notesCount = document.getElementById('notesCount');
    }

    attachEventListeners() {
        this.addNoteBtn.addEventListener('click', () => this.addNote());
        this.updateNoteBtn.addEventListener('click', () => this.updateNote());
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());
        this.searchInput.addEventListener('input', (e) => this.searchNotes(e.target.value));

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                if (this.currentEditId) {
                    this.updateNote();
                } else {
                    this.addNote();
                }
            }
            if (e.key === 'Escape' && this.currentEditId) {
                this.cancelEdit();
            }
        });
    }

    loadNotes() {
        const notesJSON = localStorage.getItem('notes');
        return notesJSON ? JSON.parse(notesJSON) : [];
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    addNote() {
        const title = this.noteTitle.value.trim();
        const content = this.noteContent.value.trim();

        if (!title && !content) {
            this.showNotification('Please enter a title or content', 'error');
            return;
        }

        const note = {
            id: Date.now(),
            title: title || 'Untitled Note',
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.unshift(note);
        this.saveNotes();
        this.clearForm();
        this.renderNotes();
        this.showNotification('Note added successfully!', 'success');
    }

    updateNote() {
        const title = this.noteTitle.value.trim();
        const content = this.noteContent.value.trim();

        if (!title && !content) {
            this.showNotification('Please enter a title or content', 'error');
            return;
        }

        const noteIndex = this.notes.findIndex(note => note.id === this.currentEditId);
        if (noteIndex !== -1) {
            this.notes[noteIndex] = {
                ...this.notes[noteIndex],
                title: title || 'Untitled Note',
                content: content,
                updatedAt: new Date().toISOString()
            };
            this.saveNotes();
            this.clearForm();
            this.currentEditId = null;
            this.toggleEditMode(false);
            this.renderNotes();
            this.showNotification('Note updated successfully!', 'success');
        }
    }

    deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveNotes();
            this.renderNotes();
            this.showNotification('Note deleted successfully!', 'success');

            if (this.currentEditId === id) {
                this.cancelEdit();
            }
        }
    }

    editNote(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            this.noteTitle.value = note.title === 'Untitled Note' ? '' : note.title;
            this.noteContent.value = note.content;
            this.currentEditId = id;
            this.toggleEditMode(true);
            this.noteTitle.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    cancelEdit() {
        this.clearForm();
        this.currentEditId = null;
        this.toggleEditMode(false);
    }

    toggleEditMode(isEditing) {
        if (isEditing) {
            this.addNoteBtn.style.display = 'none';
            this.updateNoteBtn.style.display = 'block';
            this.cancelBtn.style.display = 'block';
        } else {
            this.addNoteBtn.style.display = 'block';
            this.updateNoteBtn.style.display = 'none';
            this.cancelBtn.style.display = 'none';
        }
    }

    clearForm() {
        this.noteTitle.value = '';
        this.noteContent.value = '';
    }

    searchNotes(query) {
        const searchTerm = query.toLowerCase().trim();
        const filteredNotes = searchTerm
            ? this.notes.filter(note =>
                note.title.toLowerCase().includes(searchTerm) ||
                note.content.toLowerCase().includes(searchTerm)
            )
            : this.notes;

        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        this.notesContainer.innerHTML = '';

        if (notesToRender.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.notesContainer.classList.add('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            this.notesContainer.classList.remove('hidden');

            notesToRender.forEach(note => {
                const noteCard = this.createNoteCard(note);
                this.notesContainer.appendChild(noteCard);
            });
        }

        this.updateNotesCount(notesToRender.length);
    }

    createNoteCard(note) {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.setAttribute('data-id', note.id);

        const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const updatedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const wasUpdated = note.createdAt !== note.updatedAt;

        card.innerHTML = `
            <h3>${this.escapeHtml(note.title)}</h3>
            <p>${this.escapeHtml(note.content) || '<em>No content</em>'}</p>
            <div class="note-meta">
                Created: ${createdDate}
                ${wasUpdated ? `<br>Updated: ${updatedDate}` : ''}
            </div>
            <div class="note-actions">
                <button class="edit-btn" onclick="app.editNote(${note.id})">Edit</button>
                <button class="delete-btn" onclick="app.deleteNote(${note.id})">Delete</button>
            </div>
        `;

        return card;
    }

    updateNotesCount(count) {
        this.notesCount.textContent = `${count} ${count === 1 ? 'note' : 'notes'}`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;

        // Set background color based on type
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            info: '#4299e1'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;

        // Add animation keyframes
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NotesApp();
});
