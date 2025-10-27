let year = document.querySelector("#year");

$(document).ready(function () {
  if (year) {
    year.innerText = new Date().getFullYear();
  }

  // Todo app functionality
  loadTodos();

  const addTodoBtn = document.getElementById('addTodoBtn');
  if (addTodoBtn) {
    addTodoBtn.addEventListener('click', addTodo);
  }

  const todoInput = document.getElementById('todoInput');
  if (todoInput) {
    todoInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }
});

// Load todos from localStorage
function loadTodos() {
  const todosList = document.getElementById('todosList');
  if (!todosList) return;

  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todosList.innerHTML = '';

  todos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    todosList.appendChild(todoElement);
  });
}

// Add a new todo
function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const text = todoInput.value.trim();

  if (!text) {
    alert('Please enter a todo');
    return;
  }

  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.push({
    text: text,
    completed: false,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  todoInput.value = '';
  loadTodos();
}

// Create todo element
function createTodoElement(todo, index) {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo-item' + (todo.completed ? ' completed' : '');

  todoDiv.innerHTML = `
    <div class="todo-content">
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
      <span class="todo-text">${todo.text}</span>
    </div>
    <div class="todo-actions">
      <span class="todo-date">${todo.date}</span>
      <button class="delete-todo-btn" onclick="deleteTodo(${index})">Delete</button>
    </div>
  `;

  return todoDiv;
}

// Toggle todo completion
function toggleTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

// Delete a todo
function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}
