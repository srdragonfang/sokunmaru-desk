// elements
const notesListDOM = document.querySelector(".notes-list");
const noteTitleDOM = document.querySelector(".note-title");
const noteTextDOM = document.querySelector(".note-text");
const noteAlertDOM = document.querySelector(".note-alert");
// buttons
const noteAddBtn = document.querySelector(".btn-noteAdd");

// edit options
let editTitleNote;
let editTextNote;
let editFlag = false;
let editID = "";

// get value from
const noteTitleInput = document.querySelector(".input-title");
const noteTextInput = document.querySelector(".input-text");
noteCreate();

// ANCHOR:          note conditional
function noteCreate() {
  noteAddBtn.addEventListener("click", () => {
    console.log("edit status conditional", editID != "");
    console.log("edit status conditional 1", !!editID);
    console.log("edit status conditional 2 ", editID != "" && !!editFlag);
    if (!editFlag) {
      if (noteTitleInput.value === "" && noteTextInput.value === "") {
        noteAlertDOM.innerHTML = "Please fill in the blanks";
      } else if (noteTitleInput.value !== "" && noteTextInput.value !== "") {
        noteRender();
        setBackToDefault();
      }
    } else if (editID != "" && !!editFlag) {
      console.log("what is", editID, noteTitleInput.value, noteTextInput.value);
      console.log("what is", editTitleNote.parentElement);
      editTitleNote.innerHTML = noteTitleInput.value;
      editTextNote.innerHTML = noteTextInput.value;
      editFromLocalStorage(editID, noteTitleInput.value, noteTextInput.value);
      setBackToDefault();
    }
  });
}

//   ANCHOR *** create new note
function noteRender() {
  let noteTitleValue = noteTitleInput.value;
  let noteTextValue = noteTextInput.value;
  let noteID = generateID();

  const note = document.createElement("div");
  note.setAttribute("data-id", noteID);
  note.classList.add("note");

  note.innerHTML = `
          <div class="note-bar">
              <i class="fa-solid fa-thumbtack btn-pin"></i>
              <h3 class="note-title">${noteTitleValue}</h3>
              <i class="fa-solid fa-marker btn-edit"></i>
              <i class="fa-solid fa-expand btn-fullscr"></i>
              <i class="fa-solid fa-xmark btn-del"></i>
          </div>
              <p class="note-text">${noteTextValue}</p>
      `;

  //   const btnPins = document.querySelectorAll(".btn-pin");
  const btnDel = note.querySelector(".btn-del");
  // console.log(btnDel);
  btnDel.addEventListener("click", deleteNote);
  const btnEdit = note.querySelector(".btn-edit");
  // console.log(btnEdit);

  btnEdit.addEventListener("click", () => {
    editNote();
  });
  //   const btnFullScreens = document.querySelectorAll(".btn-fullsrc");

  //  append child
  notesListDOM.appendChild(note);

  addToLocalStorage(noteID, noteTitleValue, noteTextValue);
}

// create random ID
function generateID() {
  return Math.floor(Math.random() * 100 + Math.random() * 10);
  // return Math.floor(Math.random() * notesListDOM.length)
}

// TODO - delete note
function deleteNote(e) {
  const noteEl = e.currentTarget.parentElement.parentElement;
  // get id to remove note from localStorage
  const id = noteEl.dataset.id;
  console.log("id note click delete", id);

  notesListDOM.removeChild(noteEl);
  removeFromLocalStorage(id);
}

// TODO - edit note
function editNote(e) {
  const noteEl = e.currentTarget.parentElement.parentElement;
  const id = noteEl.dataset.id;

  noteAddBtn.value = "Save Note";
  // get element DOM
  editTitleNote = e.currentTarget.parentElement.children[1];
  editTextNote = e.currentTarget.parentElement.parentElement.children[1];

  // get input(title, text) value
  noteTitleInput.value = editTitleNote.innerHTML;
  noteTextInput.value = editTextNote.innerHTML;
  editFlag = true;
  editID = noteEl.dataset.id;
  // console.log("edit >|")
  console.log("title value before edit", editTitleNote, editID);
}

function setBackToDefault() {
  noteTitleInput.value = "";
  noteTextInput.value = "";

  noteAlertDOM.innerHTML = "";

  editFlag = false;
  editID = "";
  noteAddBtn.value = "Add Note";
}

function addToLocalStorage(id, title, text) {
  const note = { id, title, text };
  let notes = getLocalStorage();
  notes.push(note);
  localStorage.setItem("noteList", JSON.stringify(notes));
}

function getLocalStorage() {
  return localStorage.getItem("noteList")
    ? JSON.parse(localStorage.getItem("noteList"))
    : [];
}

function setupItems() {
  // get notes from local storage
  let notes = getLocalStorage();
  console.log(notes);
  if (notes.length > 0) {
    notes.forEach((note) => {
      noteRender2(note.id, note.title, note.text);
      // console.log(note)
      // console.log(noteRender2())
    });
  }
}
setupItems();
function noteRender2(id, title, text) {
  let noteTitleValue = title;
  let noteTextValue = text;
  let noteID = id;
  const note = document.createElement("div");
  note.setAttribute("data-id", noteID);
  note.classList.add("note");

  note.innerHTML = `
          <div class="note-bar">
              <i class="fa-solid fa-thumbtack btn-pin"></i>
              <h3 class="note-title">${noteTitleValue}</h3>
              <i class="fa-solid fa-marker btn-edit"></i>
              <i class="fa-solid fa-expand btn-fullscr"></i>
              <i class="fa-solid fa-xmark btn-del"></i>
          </div>
              <p class="note-text">${noteTextValue}</p>
      `;
  //   const btnPins = document.querySelectorAll(".btn-pin");
  const btnDel = note.querySelector(".btn-del");
  // console.log(btnDel);
  btnDel.addEventListener("click", deleteNote);
  const btnEdit = note.querySelector(".btn-edit");
  // console.log(btnEdit);

  btnEdit.addEventListener("click", editNote);
  //   const btnFullScreens = document.querySelectorAll(".btn-fullsrc");

  //  append child
  notesListDOM.appendChild(note);
}

function removeFromLocalStorage(id) {
  let notes = getLocalStorage();
  console.log("notes before delete", notes);
  console.log("removeFromLocalStorage", id);

  notes = notes.filter(function (note) {
    return note.id != id;
  });

  console.log("notes after deleted", notes);
  localStorage.setItem("noteList", JSON.stringify(notes));
}

function editFromLocalStorage(id, title, text) {
  let notes = getLocalStorage();
  console.log("notes before edit", notes);
  console.log("edit", id);

  notes = notes.filter(function (note) {
    if (note.id == id) {
      note.title = noteTitleInput.value;
      note.text = noteTextInput.value;
    }
    return note;
  });

  console.log("notes after edited", notes);
  localStorage.setItem("noteList", JSON.stringify(notes));
}
