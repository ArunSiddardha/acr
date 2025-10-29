const STORAGE_KEY = 'todoApp_v1';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const state = {
  todos: [],
  filter: 'all', // 'all' | 'active' | 'completed'
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.todos)) state.todos = parsed.todos;
    if (['all', 'active', 'completed'].includes(parsed.filter)) state.filter = parsed.filter;
  } catch {}
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos: state.todos, filter: state.filter }));
}

function setFilter(next) {
  state.filter = next;
  save();
  render();
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  state.todos.unshift({ id: uid(), text: trimmed, completed: false, createdAt: Date.now() });
  save();
  render();
}

function toggleTodo(id, value) {
  const t = state.todos.find(t => t.id === id);
  if (!t) return;
  t.completed = typeof value === 'boolean' ? value : !t.completed;
  save();
  render();
}

function deleteTodo(id) {
  state.todos = state.todos.filter(t => t.id !== id);
  save();
  render();
}

function editTodo(id, text) {
  const t = state.todos.find(t => t.id === id);
  if (!t) return;
  const trimmed = text.trim();
  if (!trimmed) { deleteTodo(id); return; }
  t.text = trimmed;
  save();
  render();
}

function clearCompleted() {
  state.todos = state.todos.filter(t => !t.completed);
  save();
  render();
}

function toggleAll(flag) {
  const next = typeof flag === 'boolean' ? flag : state.todos.some(t => !t.completed);
  state.todos.forEach(t => t.completed = next);
  save();
  render();
}

function filteredTodos() {
  switch (state.filter) {
    case 'active': return state.todos.filter(t => !t.completed);
    case 'completed': return state.todos.filter(t => t.completed);
    default: return state.todos;
  }
}

function pluralize(n, word, suffix = 's') {
  return `${n} ${word}${n === 1 ? '' : suffix}`;
}

function render() {
  const list = $('#todo-list');
  list.innerHTML = '';

  const template = $('#todo-item-template');
  const items = filteredTodos();

  for (const t of items) {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = t.id;
    if (t.completed) node.classList.add('completed');

    const toggle = $('.toggle', node);
    toggle.checked = t.completed;

    const content = $('.content', node);
    content.textContent = t.text;
    content.title = 'Double‑click to edit';

    const edit = $('.edit', node);
    edit.value = t.text;

    list.appendChild(node);
  }

  const itemsLeft = state.todos.filter(t => !t.completed).length;
  $('#items-left').textContent = pluralize(itemsLeft, 'item') + ' left';

  // Toggle all checkbox reflects state
  const all = state.todos.length > 0 && state.todos.every(t => t.completed);
  $('#toggle-all').checked = all;

  // Filter buttons
  $$('.filter').forEach(btn => {
    const isActive = btn.dataset.filter === state.filter;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
}

function startEditing(li) {
  li.classList.add('editing');
  const input = $('.edit', li);
  input.value = $('.content', li).textContent || '';
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
}

function stopEditing(li, saveChange) {
  li.classList.remove('editing');
  if (!saveChange) return;
  const id = li.dataset.id;
  const val = $('.edit', li).value;
  editTodo(id, val);
}

function bindEvents() {
  // Create
  $('#new-todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#new-todo');
    addTodo(input.value);
    input.value = '';
  });

  // Bulk toggle
  $('#toggle-all').addEventListener('change', (e) => toggleAll(e.target.checked));

  // Filters
  $('.filters').addEventListener('click', (e) => {
    const btn = e.target.closest('button.filter');
    if (!btn) return;
    setFilter(btn.dataset.filter);
  });

  // Clear completed
  $('#clear-completed').addEventListener('click', clearCompleted);

  // List delegation
  $('#todo-list').addEventListener('click', (e) => {
    const li = e.target.closest('li.item');
    if (!li) return;
    if (e.target.matches('button.destroy')) {
      deleteTodo(li.dataset.id);
    } else if (e.target.matches('input.toggle')) {
      toggleTodo(li.dataset.id, e.target.checked);
    }
  });

  // Double click to edit
  $('#todo-list').addEventListener('dblclick', (e) => {
    const li = e.target.closest('li.item');
    if (!li) return;
    if (e.target.matches('.content')) startEditing(li);
  });

  // Keyboard + blur on edit field
  $('#todo-list').addEventListener('keydown', (e) => {
    const li = e.target.closest('li.item.editing');
    if (!li) return;
    if (e.key === 'Enter') {
      stopEditing(li, true);
    } else if (e.key === 'Escape') {
      stopEditing(li, false);
      render();
    }
  });
  $('#todo-list').addEventListener('focusout', (e) => {
    const li = e.target.closest('li.item.editing');
    if (!li) return;
    // Delay to allow click on delete without saving
    setTimeout(() => {
      if (!li.contains(document.activeElement)) stopEditing(li, true);
    }, 0);
  });
}

function init() {
  load();
  bindEvents();
  render();
}

document.addEventListener('DOMContentLoaded', init);

