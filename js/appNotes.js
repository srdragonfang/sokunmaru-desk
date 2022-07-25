// elements
const notesListDOM = document.querySelector(".notes-list");
const noteTitleDOM = document.querySelector(".note-title");
const noteTextDOM = document.querySelector(".note-text");
const noteAlertDOM = document.querySelector(".note-alert");
// buttons
const noteAddBtn = document.querySelector(".btn-noteAdd");
const btnPin = document.querySelector(".btn-pin");
const btnEdit = document.querySelector(".btn-edit");
const btnFullScreen = document.querySelector(".btn-fullsrc");
const btnDel = document.querySelector(".btn-del");
// get value from
const noteTitleInput = document.querySelector(".input-title");
const noteTextInput = document.querySelector(".input-text");

noteCreate();

// ANCHOR: note conditional
function noteCreate() {
  noteAddBtn.addEventListener("click", () => {
    if (noteTitleInput.value === "" && noteTextInput.value === "") {
      noteAlertDOM.textContent = "Please fill in the blanks";
    } else {
      noteAdd();
      noteAlertDOM.textContent = "";
    }
  });
}

//   ANCHOR *** create new note
function noteAdd() {
  const noteTitleValue = noteTitleInput.value;
  const noteTextValue = noteTextInput.value;

  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="note">
        <div class="note-bar">
            <i class="fa-solid fa-thumbtack btn-pin" onclick="notePin()"></i>
            <h3 class="note-title">${noteTitleValue}</h3>
            <i class="fa-solid fa-marker btn-edit" onclick="noteEdit()"></i>
            <i class="fa-solid fa-expand btn-fullscr" onclick="noteFullscr()"></i>
            <i class="fa-solid fa-xmark btn-del" onclick="noteDel()"></i>
        </div>
            <p class="note-text">${noteTextValue}</p>
        </div>
    `;
  notesListDOM.appendChild(note);
  // reset input value

  noteTitleInput.value = "";
  noteTextInput.value = "";
}

function noteDel() {
  alert("hey");
}
function noteEdit() {
  alert("hey");
}
function noteFullscr() {
  alert("hey");
}
function notePin() {
  alert("hey");
}
