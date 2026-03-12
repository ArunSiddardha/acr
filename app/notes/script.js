(function(){
  const STORAGE_KEY = 'notes.v1';
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  const els = {
    notesList: $('#notesList'),
    newBtn: $('#newNoteBtn'),
    exportBtn: $('#exportBtn'),
    importInput: $('#importInput'),
    search: $('#searchInput'),
    sort: $('#sortSelect'),
    title: $('#titleInput'),
    content: $('#contentInput'),
    deleteBtn: $('#deleteBtn'),
    pinBtn: $('#pinBtn'),
    status: $('#statusBar'),
  };

  /** @type {Array<{id:string,title:string,content:string,created:number,updated:number,pin?:boolean}>} */
  let notes = load();
  let activeId = notes[0]?.id || null;

  function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4); }
  function now(){ return Date.now(); }

  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return [];
      const arr = JSON.parse(raw);
      if(!Array.isArray(arr)) return [];
      return arr.map(n=>({id:uid(), title:'', content:'', created:now(), updated:now(), ...n}));
    }catch{ return []; }
  }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }

  function setStatus(msg){ els.status.textContent = msg; }

  function sortNotes(list){
    const key = els.sort.value;
    const base = [...list];
    base.sort((a,b)=>{
      if(a.pin && !b.pin) return -1;
      if(!a.pin && b.pin) return 1;
      if(key==='title') return a.title.localeCompare(b.title);
      if(key==='created') return b.created - a.created;
      return b.updated - a.updated;
    });
    return base;
  }

  function renderList(){
    const q = els.search.value.trim().toLowerCase();
    const filtered = notes.filter(n=>!q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    const sorted = sortNotes(filtered);
    els.notesList.innerHTML = '';
    if(sorted.length===0){
      const li = document.createElement('li');
      li.className='empty'; li.textContent='No notes. Create a new one!';
      els.notesList.appendChild(li); return;
    }
    for(const n of sorted){
      const li = document.createElement('li');
      li.className = 'note-item' + (n.id===activeId?' active':'');
      li.dataset.id = n.id;

      const title = document.createElement('div');
      title.className='note-title'; title.textContent = n.title || 'Untitled';

      const snip = document.createElement('div');
      snip.className='note-snippet'; snip.textContent = (n.content || '').split(/\n/)[0].slice(0,80);

      const meta = document.createElement('div');
      meta.className='note-meta';
      const updated = new Date(n.updated).toLocaleString();
      meta.innerHTML = `${n.pin?'<span class="note-pin">📌</span>':''}<span>Edited ${updated}</span>`;

      li.appendChild(title); li.appendChild(snip); li.appendChild(meta);
      els.notesList.appendChild(li);
    }
  }

  function setActive(id){
    activeId = id; renderList(); const n = notes.find(x=>x.id===id);
    if(!n){
      els.title.value=''; els.content.value=''; setStatus('Ready.');
      return;
    }
    els.title.value = n.title; els.content.value = n.content;
    setStatus(`Opened note — last edited ${new Date(n.updated).toLocaleString()}`);
  }

  function createNote(){
    const n = { id: uid(), title: '', content: '', created: now(), updated: now(), pin:false };
    notes.unshift(n); save(); renderList(); setActive(n.id);
  }

  function updateActive(partial){
    const i = notes.findIndex(n=>n.id===activeId); if(i<0) return;
    notes[i] = { ...notes[i], ...partial, updated: now() };
    save(); renderList();
  }

  function deleteActive(){
    const i = notes.findIndex(n=>n.id===activeId); if(i<0) return;
    const removed = notes.splice(i,1)[0];
    save();
    const next = notes[i] || notes[i-1] || notes[0];
    setStatus(`Deleted “${removed.title || 'Untitled'}”`);
    setActive(next?.id || null);
  }

  function togglePin(){
    const n = notes.find(x=>x.id===activeId); if(!n) return;
    n.pin = !n.pin; n.updated = now(); save(); renderList();
    setStatus(n.pin? 'Pinned note.' : 'Unpinned note.');
  }

  function exportNotes(){
    const blob = new Blob([JSON.stringify(notes,null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'notes-export.json';
    document.body.appendChild(a); a.click(); a.remove();
    setStatus('Exported notes to JSON.');
  }

  function importNotes(file){
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const data = JSON.parse(String(reader.result||'[]'));
        if(!Array.isArray(data)) throw new Error('Invalid format');
        const sanitized = data.map(n=>({
          id: n.id||uid(),
          title: String(n.title||''),
          content: String(n.content||''),
          created: Number(n.created)||now(),
          updated: Number(n.updated)||now(),
          pin: Boolean(n.pin)
        }));
        notes = sanitized; save(); renderList(); setActive(notes[0]?.id||null);
        setStatus('Imported notes.');
      }catch(e){ setStatus('Import failed.'); }
    };
    reader.readAsText(file);
  }

  // Event wiring
  els.newBtn.addEventListener('click', createNote);
  els.exportBtn.addEventListener('click', exportNotes);
  els.importInput.addEventListener('change', e=>{
    const f = e.target.files?.[0]; if(f) importNotes(f);
    e.target.value = '';
  });
  els.search.addEventListener('input', renderList);
  els.sort.addEventListener('change', renderList);
  els.deleteBtn.addEventListener('click', deleteActive);
  els.pinBtn.addEventListener('click', togglePin);

  els.title.addEventListener('input', e=>{
    updateActive({ title: e.target.value });
  });
  els.content.addEventListener('input', e=>{
    updateActive({ content: e.target.value });
  });

  els.notesList.addEventListener('click', e=>{
    const li = e.target.closest('.note-item');
    if(li?.dataset.id) setActive(li.dataset.id);
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', e=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='f'){ els.search.focus(); e.preventDefault(); }
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='n' || e.key.toLowerCase()==='n'){
      if(document.activeElement===els.title || document.activeElement===els.content) return;
      createNote(); e.preventDefault();
    }
  });

  // Initial paint
  renderList(); setActive(activeId);
})();
