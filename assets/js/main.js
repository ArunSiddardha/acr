let year = document.querySelector("#year");

$(document).ready(function () {
  if (year) {
    year.innerText = new Date().getFullYear();
  }
  
  // Note-taking app functionality
  loadNotes();
  
  const addNoteBtn = document.getElementById('addNoteBtn');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', addNote);
  }
});

// Load notes from localStorage
function loadNotes() {
  const notesList = document.getElementById('notesList');
  if (!notesList) return;
  
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notesList.innerHTML = '';
  
  notes.forEach((note, index) => {
    const noteElement = createNoteElement(note, index);
    notesList.appendChild(noteElement);
  });
}

// Add a new note
function addNote() {
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');
  
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  
  if (!title || !content) {
    alert('Please enter both title and content');
    return;
  }
  
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notes.push({
    title: title,
    content: content,
    date: new Date().toLocaleDateString()
  });
  
  localStorage.setItem('notes', JSON.stringify(notes));
  
  titleInput.value = '';
  contentInput.value = '';
  
  loadNotes();
}

// Create note element
function createNoteElement(note, index) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note-item';
  
  noteDiv.innerHTML = `
    <div class="note-header">
      <h3 class="note-item-title">${note.title}</h3>
      <span class="note-date">${note.date}</span>
    </div>
    <p class="note-item-content">${note.content}</p>
    <button class="delete-note-btn" onclick="deleteNote(${index})">Delete</button>
  `;
  
  return noteDiv;
}

// Delete a note
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes();
}
