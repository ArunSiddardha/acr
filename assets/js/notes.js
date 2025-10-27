// Note Taking App
class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.currentNoteId = null;
        this.currentFilter = 'all';
        this.deleteNoteId = null;
        this.initializeElements();
        this.attachEventListeners();
        this.renderNotes();
        this.updateStats();
        this.updateTagFilter();
    }

    initializeElements() {
        // Buttons
        this.newNoteBtn = document.getElementById('newNoteBtn');
        this.saveNoteBtn = document.getElementById('saveNote');
        this.cancelEditBtn = document.getElementById('cancelEdit');
        this.pinNoteBtn = document.getElementById('pinNote');
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.confirmDeleteBtn = document.getElementById('confirmDelete');
        this.cancelDeleteBtn = document.getElementById('cancelDelete');

        // Editor elements
        this.noteEditor = document.getElementById('noteEditor');
        this.noteTitleInput = document.getElementById('noteTitle');
        this.noteContentEditor = document.getElementById('noteContent');
        this.noteTagsInput = document.getElementById('noteTagsInput');
        this.noteColorSelect = document.getElementById('noteColor');

        // Display elements
        this.notesGrid = document.getElementById('notesGrid');
        this.searchInput = document.getElementById('searchInput');
        this.tagFilter = document.getElementById('tagFilter');
        this.confirmModal = document.getElementById('confirmModal');

        // Stats
        this.totalNotesEl = document.getElementById('totalNotes');
        this.pinnedNotesEl = document.getElementById('pinnedNotes');

        // Toolbar buttons
        this.toolbarBtns = document.querySelectorAll('.toolbar-btn');
    }

    attachEventListeners() {
        // Button listeners
        this.newNoteBtn.addEventListener('click', () => this.showEditor());
        this.saveNoteBtn.addEventListener('click', () => this.saveNote());
        this.cancelEditBtn.addEventListener('click', () => this.hideEditor());
        this.pinNoteBtn.addEventListener('click', () => this.togglePinCurrentNote());
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        this.confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
        this.cancelDeleteBtn.addEventListener('click', () => this.hideConfirmModal());

        // Search listener
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Toolbar formatting
        this.toolbarBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const format = btn.dataset.format;
                document.execCommand(format, false, null);
                this.noteContentEditor.focus();
            });
        });

        // Close modal on background click
        this.confirmModal.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) {
                this.hideConfirmModal();
            }
        });

        // Load theme preference
        this.loadTheme();
    }

    loadNotes() {
        const saved = localStorage.getItem('notes');
        return saved ? JSON.parse(saved) : [];
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    showEditor(noteId = null) {
        this.currentNoteId = noteId;
        this.noteEditor.classList.remove('hidden');

        if (noteId) {
            const note = this.notes.find(n => n.id === noteId);
            if (note) {
                this.noteTitleInput.value = note.title;
                this.noteContentEditor.innerHTML = note.content;
                this.noteTagsInput.value = note.tags.join(', ');
                this.noteColorSelect.value = note.color || 'default';
                this.updatePinButton(note.pinned);
            }
        } else {
            this.noteTitleInput.value = '';
            this.noteContentEditor.innerHTML = '';
            this.noteTagsInput.value = '';
            this.noteColorSelect.value = 'default';
            this.updatePinButton(false);
        }

        this.noteTitleInput.focus();
        this.noteEditor.scrollIntoView({ behavior: 'smooth' });
    }

    hideEditor() {
        this.noteEditor.classList.add('hidden');
        this.currentNoteId = null;
    }

    updatePinButton(isPinned) {
        this.pinNoteBtn.textContent = isPinned ? '📍' : '📌';
        this.pinNoteBtn.title = isPinned ? 'Unpin note' : 'Pin note';
    }

    togglePinCurrentNote() {
        if (this.currentNoteId) {
            const note = this.notes.find(n => n.id === this.currentNoteId);
            if (note) {
                note.pinned = !note.pinned;
                this.updatePinButton(note.pinned);
            }
        }
    }

    saveNote() {
        const title = this.noteTitleInput.value.trim();
        const content = this.noteContentEditor.innerHTML.trim();
        const tagsInput = this.noteTagsInput.value.trim();
        const color = this.noteColorSelect.value;

        if (!title && !content) {
            alert('Please add a title or content to your note');
            return;
        }

        const tags = tagsInput
            ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
            : [];

        const now = new Date().toISOString();

        if (this.currentNoteId) {
            // Update existing note
            const note = this.notes.find(n => n.id === this.currentNoteId);
            if (note) {
                note.title = title || 'Untitled Note';
                note.content = content;
                note.tags = tags;
                note.color = color;
                note.updatedAt = now;
            }
        } else {
            // Create new note
            const newNote = {
                id: this.generateId(),
                title: title || 'Untitled Note',
                content: content,
                tags: tags,
                color: color,
                pinned: false,
                createdAt: now,
                updatedAt: now
            };
            this.notes.unshift(newNote);
        }

        this.saveNotes();
        this.hideEditor();
        this.renderNotes();
        this.updateStats();
        this.updateTagFilter();
    }

    editNote(id) {
        this.showEditor(id);
    }

    deleteNote(id) {
        this.deleteNoteId = id;
        this.confirmModal.classList.remove('hidden');
    }

    confirmDelete() {
        if (this.deleteNoteId) {
            this.notes = this.notes.filter(n => n.id !== this.deleteNoteId);
            this.saveNotes();
            this.renderNotes();
            this.updateStats();
            this.updateTagFilter();
            this.hideConfirmModal();
            this.deleteNoteId = null;
        }
    }

    hideConfirmModal() {
        this.confirmModal.classList.add('hidden');
        this.deleteNoteId = null;
    }

    togglePin(id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            note.pinned = !note.pinned;
            this.saveNotes();
            this.renderNotes();
            this.updateStats();
        }
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase();
        const noteCards = document.querySelectorAll('.note-card');

        noteCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('.note-card-content').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.note-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');

            if (title.includes(searchTerm) || content.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setTagFilter(tag) {
        this.currentFilter = tag;

        // Update active button
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tag === tag) {
                btn.classList.add('active');
            }
        });

        this.renderNotes();
    }

    updateTagFilter() {
        const allTags = new Set();
        this.notes.forEach(note => {
            note.tags.forEach(tag => allTags.add(tag));
        });

        const sortedTags = Array.from(allTags).sort();

        this.tagFilter.innerHTML = '<button class="tag-btn active" data-tag="all">All</button>';

        sortedTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'tag-btn';
            btn.dataset.tag = tag;
            btn.textContent = tag;
            btn.addEventListener('click', () => this.setTagFilter(tag));
            this.tagFilter.appendChild(btn);
        });

        // Re-attach listener for "All" button
        this.tagFilter.querySelector('[data-tag="all"]').addEventListener('click', () => {
            this.setTagFilter('all');
        });
    }

    renderNotes() {
        // Filter notes
        let filteredNotes = this.notes;
        if (this.currentFilter !== 'all') {
            filteredNotes = this.notes.filter(note => note.tags.includes(this.currentFilter));
        }

        // Sort: pinned first, then by updated date
        filteredNotes.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        if (filteredNotes.length === 0) {
            this.notesGrid.innerHTML = `
                <div class="empty-state">
                    <h2>No notes found</h2>
                    <p>${this.currentFilter === 'all'
                        ? 'Click "New Note" to create your first note'
                        : 'No notes with this tag'}</p>
                </div>
            `;
            return;
        }

        this.notesGrid.innerHTML = filteredNotes.map(note => this.createNoteCard(note)).join('');

        // Attach event listeners to note cards
        filteredNotes.forEach(note => {
            const card = document.querySelector(`[data-note-id="${note.id}"]`);

            card.querySelector('.note-card-content').addEventListener('click', () => {
                this.editNote(note.id);
            });

            card.querySelector('.note-card h3').addEventListener('click', () => {
                this.editNote(note.id);
            });

            card.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.editNote(note.id);
            });

            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteNote(note.id);
            });

            card.querySelector('.pin-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePin(note.id);
            });
        });
    }

    createNoteCard(note) {
        const date = new Date(note.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const contentPreview = this.stripHtml(note.content).substring(0, 150);

        return `
            <div class="note-card ${note.color !== 'default' ? 'color-' + note.color : ''} ${note.pinned ? 'pinned' : ''}"
                 data-note-id="${note.id}">
                <div class="note-card-header">
                    <h3>${this.escapeHtml(note.title)}</h3>
                    <div class="note-card-actions">
                        <button class="note-action-btn pin-btn" title="${note.pinned ? 'Unpin' : 'Pin'}">${note.pinned ? '📍' : '📌'}</button>
                        <button class="note-action-btn edit-btn" title="Edit">✏️</button>
                        <button class="note-action-btn delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="note-card-content">
                    ${contentPreview}${contentPreview.length >= 150 ? '...' : ''}
                </div>
                <div class="note-card-footer">
                    <div class="note-tags">
                        ${note.tags.map(tag => `<span class="note-tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                    <div class="note-date">${date}</div>
                </div>
            </div>
        `;
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats() {
        this.totalNotesEl.textContent = this.notes.length;
        this.pinnedNotesEl.textContent = this.notes.filter(n => n.pinned).length;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    loadTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});
