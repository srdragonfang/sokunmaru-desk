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
    if (!editFlag) {
      if (noteTitleInput.value === "" && noteTextInput.value === "") {
        noteAlertDOM.textContent = "Please fill in the blanks";
      } else if (noteTitleInput.value !== "" && noteTextInput.value !== "") {
        noteRender();
        setBackToDefault();
      }
    } else if (
      noteTitleInput.value !== "" &&
      noteTextInput.value !== "" &&
      !!editFlag
    ) {
      editTitleNote.innerHTML = noteTitleInput.value;
      editTextNote.innerHTML = noteTextInput.value;
    }
  });
}

//   ANCHOR *** create new note
function noteRender() {
  const noteTitleValue = noteTitleInput.value;
  const noteTextValue = noteTextInput.value;
  const noteID = generateID();
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

// create random ID
function generateID() {
  return Math.floor(Math.random() * 100);
  // return Math.floor(Math.random() * notesListDOM.length)
}

// TODO - delete note
function deleteNote(e) {
  const noteEl = e.currentTarget.parentElement.parentElement;
  // get id to remove note from localStorage
  // const id = noteEl.dataset.id

  notesListDOM.removeChild(noteEl);
}

// TODO - edit note
function editNote(e) {
  const noteEl = e.currentTarget.parentElement.parentElement;

  noteAddBtn.value = "Save Note";

  editTitleNote = e.currentTarget.parentElement.children[1].textContent;
  editTextNote = e.currentTarget.parentElement.parentElement.children[1].textContent;
  noteTitleInput.value = editTitleNote;
  noteTextInput.value = editTextNote;
  editFlag = true;
  editID = noteEl.dataset.id;
}

function setBackToDefault() {
  noteTitleInput.value = "";
  noteTextInput.value = "";

  noteAlertDOM.textContent = "";

  editFlag = false;
  editID = "";
  noteAddBtn.value = "Add Note";
}
