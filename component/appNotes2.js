// elements
const notesListDOM = document.querySelector(".notes-list");
const noteTitleDOM = document.querySelector(".note-title");
const noteTextDOM = document.querySelector(".note-text");
const noteAlertDOM = document.querySelector(".note-alert");
// buttons
const noteAddBtn = document.querySelector(".btn-noteAdd");

// edit options
let editElement;
let editFlag = false;
let editID = "";


// get value from
const noteTitleInput = document.querySelector(".input-title");
const noteTextInput = document.querySelector(".input-text");

noteCreate();

// ANCHOR:          note conditional
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
  const noteID = generateID();

  if (!editFlag) {
    const note = document.createElement("div");
    
//    const attr = document.createAttribute("data-id")
//     attr.value = noteID;
    note.setAttribute("data-id", noteID)
    note.classList.add("note");

    note.innerHTML = `
          <div class="note-bar">
              <i class="fa-solid fa-thumbtack btn-pin"></i>
              <h3 class="note-title">Note #${noteID}: ${noteTitleValue}</h3>
              <i class="fa-solid fa-marker btn-edit"></i>
              <i class="fa-solid fa-expand btn-fullscr"></i>
              <i class="fa-solid fa-xmark btn-del"></i>
          </div>
              <p class="note-text">${noteTextValue}</p>
      `;
   
    //   const btnPins = document.querySelectorAll(".btn-pin");
    const btnDel = note.querySelector(".btn-del");     
    console.log(btnDel); 
    btnDel.addEventListener("click", deleteNote)
    //   const btnEdits = document.querySelectorAll(".btn-edit");
    //   const btnFullScreens = document.querySelectorAll(".btn-fullsrc");



    //  append child
      notesListDOM.appendChild(note);
      // reset input value
      noteTitleInput.value = "";
      noteTextInput.value = "";
    }


}

// create random ID
function generateID() {
  return Math.floor(Math.random() * 100);
  // return Math.floor(Math.random() * notesListDOM.length)
}

// TODO - delete note
function deleteNote(e) {
    const noteEl = e.currentTarget.parentElement.parentElement
    const id = noteEl.dataset.id
    // console.log(noteEl.parentElement.parentElement)
    console.log(id)
    notesListDOM.removeChild(noteEl)
}
