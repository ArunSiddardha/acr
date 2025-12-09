// Notes App - Main JavaScript Module
(function() {
  'use strict';

  // State Management
  let notes = [];
  let currentNoteId = null;
  let autoSaveTimer = null;
  let currentFilter = 'all';

  // DOM Elements
  const elements = {
    notesList: document.getElementById('notesList'),
    newNoteBtn: document.getElementById('newNoteBtn'),
    searchInput: document.getElementById('searchInput'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    emptyState: document.getElementById('emptyState'),
    editorContainer: document.getElementById('editorContainer'),
    noteTitle: document.getElementById('noteTitle'),
    noteContent: document.getElementById('noteContent'),
    favoriteBtn: document.getElementById('favoriteBtn'),
    favoriteIcon: document.getElementById('favoriteIcon'),
    deleteBtn: document.getElementById('deleteBtn'),
    lastSaved: document.getElementById('lastSaved'),
    charCount: document.getElementById('charCount'),
    filterBtns: document.querySelectorAll('.filter-btn')
  };

  // Initialize App
  function init() {
    loadNotes();
    loadTheme();
    attachEventListeners();
    renderNotesList();
    
    // Show welcome message if no notes
    if (notes.length === 0) {
      createWelcomeNote();
    }
  }

  // Local Storage Operations
  function loadNotes() {
    const stored = localStorage.getItem('notes');
    notes = stored ? JSON.parse(stored) : [];
  }

  function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', theme === 'dark');
    elements.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    elements.themeIcon.textContent = isDark ? '☀️' : '🌙';
  }

  // Note Operations
  function createNote(title = 'Untitled Note', content = '') {
    const note = {
      id: Date.now().toString(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false
    };
    notes.unshift(note);
    saveNotes();
    return note;
  }

  function createWelcomeNote() {
    const welcomeNote = createNote(
      'Welcome to Notes! 👋',
      'This is your personal note-taking space.\n\n' +
      'Features:\n' +
      '• Create, edit, and delete notes\n' +
      '• Search through your notes\n' +
      '• Mark notes as favorites\n' +
      '• Auto-save functionality\n' +
      '• Dark/light theme toggle\n\n' +
      'Start by creating a new note or editing this one!'
    );
    renderNotesList();
    selectNote(welcomeNote.id);
  }

  function updateNote(id, updates) {
    const note = notes.find(n => n.id === id);
    if (note) {
      Object.assign(note, updates, { updatedAt: new Date().toISOString() });
      saveNotes();
      renderNotesList();
      updateLastSaved();
    }
  }

  function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
      notes = notes.filter(n => n.id !== id);
      saveNotes();
      renderNotesList();
      
      if (currentNoteId === id) {
        currentNoteId = null;
        showEmptyState();
      }
    }
  }

  function toggleFavorite(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
      note.isFavorite = !note.isFavorite;
      saveNotes();
      renderNotesList();
      updateFavoriteIcon();
    }
  }

  // UI Rendering
  function renderNotesList() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    let filteredNotes = notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm) ||
                           note.content.toLowerCase().includes(searchTerm);
      
      if (currentFilter === 'favorites') {
        return matchesSearch && note.isFavorite;
      } else if (currentFilter === 'recent') {
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return matchesSearch && new Date(note.updatedAt) > dayAgo;
      }
      return matchesSearch;
    });

    if (filteredNotes.length === 0) {
      elements.notesList.innerHTML = `
        <div class="no-notes">
          <p>${searchTerm ? 'No notes found' : 'No notes yet'}</p>
        </div>
      `;
      return;
    }

    elements.notesList.innerHTML = filteredNotes.map(note => `
      <div class="note-item ${note.id === currentNoteId ? 'active' : ''}" data-id="${note.id}">
        <div class="note-item-header">
          <h3 class="note-item-title">${escapeHtml(note.title)}</h3>
          ${note.isFavorite ? '<span class="favorite-badge">★</span>' : ''}
        </div>
        <p class="note-item-preview">${escapeHtml(note.content.substring(0, 100))}${note.content.length > 100 ? '...' : ''}</p>
        <span class="note-item-date">${formatDate(note.updatedAt)}</span>
      </div>
    `).join('');

    // Attach click handlers to note items
    document.querySelectorAll('.note-item').forEach(item => {
      item.addEventListener('click', () => selectNote(item.dataset.id));
    });
  }

  function selectNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    currentNoteId = id;
    elements.emptyState.style.display = 'none';
    elements.editorContainer.style.display = 'flex';

    elements.noteTitle.value = note.title;
    elements.noteContent.value = note.content;
    
    updateFavoriteIcon();
    updateCharCount();
    renderNotesList();
  }

  function showEmptyState() {
    elements.emptyState.style.display = 'flex';
    elements.editorContainer.style.display = 'none';
  }

  function updateFavoriteIcon() {
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
      elements.favoriteIcon.textContent = note.isFavorite ? '★' : '☆';
    }
  }

  function updateCharCount() {
    const count = elements.noteContent.value.length;
    elements.charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
  }

  function updateLastSaved() {
    elements.lastSaved.textContent = 'Saved ' + new Date().toLocaleTimeString();
    elements.lastSaved.classList.add('saved-flash');
    setTimeout(() => elements.lastSaved.classList.remove('saved-flash'), 1000);
  }

  // Event Handlers
  function attachEventListeners() {
    // New Note Button
    elements.newNoteBtn.addEventListener('click', () => {
      const note = createNote();
      renderNotesList();
      selectNote(note.id);
      elements.noteTitle.focus();
    });

    // Search Input
    elements.searchInput.addEventListener('input', debounce(renderNotesList, 300));

    // Theme Toggle
    elements.themeToggle.addEventListener('click', toggleTheme);

    // Note Title Input
    elements.noteTitle.addEventListener('input', () => {
      if (currentNoteId) {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
          updateNote(currentNoteId, { title: elements.noteTitle.value || 'Untitled Note' });
        }, 1000);
      }
    });

    // Note Content Input
    elements.noteContent.addEventListener('input', () => {
      updateCharCount();
      if (currentNoteId) {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
          updateNote(currentNoteId, { content: elements.noteContent.value });
        }, 1000);
      }
    });

    // Favorite Button
    elements.favoriteBtn.addEventListener('click', () => {
      if (currentNoteId) {
        toggleFavorite(currentNoteId);
      }
    });

    // Delete Button
    elements.deleteBtn.addEventListener('click', () => {
      if (currentNoteId) {
        deleteNote(currentNoteId);
      }
    });

    // Filter Buttons
    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderNotesList();
      });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + N: New Note
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        elements.newNoteBtn.click();
      }
      // Ctrl/Cmd + F: Focus Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        elements.searchInput.focus();
      }
      // Ctrl/Cmd + S: Manual Save (already auto-saves)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (currentNoteId) {
          updateNote(currentNoteId, {
            title: elements.noteTitle.value || 'Untitled Note',
            content: elements.noteContent.value
          });
        }
      }
    });
  }

  // Utility Functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(dateString) {
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
    
    return date.toLocaleDateString();
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
