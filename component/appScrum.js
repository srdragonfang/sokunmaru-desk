// TODO get element from DOM
function getElement(selection) {
    const element = document.querySelector(selection)

    if (element) {
        return element
    }
    throw new Error(
        `Please check ${selection} selector, no such element exists`
        )
}
/* ------------------------------- task group ------------------------------- */
const backlogDOM = getElement('#backlog')
const inprogressDOM = getElement('#inprogress')
const emergencyDOM = getElement('#emergency')
const testingDOM = getElement('#testing')
const doneDOM = getElement('#done')
const removeDOM = getElement('#remove')
/* ------------------------------- task input ------------------------------- */
const taskInput = getElement('#task-input')
const taskSubmit = getElement('#task-submit')
/* ------------------------------- task group option ------------------------------- */
const taskGroupOptions = document.querySelectorAll('.taskGroup-option')


// TODO get element from localStorage

// TODO edit - declare variable (editElement, editFlag)

// TODO eventlistener - task submit
taskSubmit.addEventListener('click', () => {
    createNewTask();
})


// TODO function - createNewTask
function createNewTask() {
    /* ----------------------------- get input value ---------------------------- */
    const taskValue = taskInput.value
    console.log(taskInput);
    console.log(taskInput.value);
    console.log(taskValue);
    // const taskGroup = task
	/* ----------------------------- create new task ---------------------------- */
    // TODO task - declare object (id, title, statusGroup, statusTask)
	const task = {
		id: generatorID(),
		title: taskValue,
		// title: 'S.R Dragonfang',
		statusGroup: getGroup(),
        statusTask: getStatus()
		// group:
	};
	console.log(task);
	/* ------------------------- input value conditional ------------------------ */
	/* ----------------------------- render to html ----------------------------- */
    const taskEl = document.createElement('div')
    taskEl.classList.add("task")
    taskEl.setAttribute('data-id', task.id)
    taskEl.setAttribute('data-statusgroup', task.statusGroup)
    taskEl.innerHTML = `
        <div class="task-status ${task.statusTask}"></div>
        <p class="task-content">${task.title}</p>
    `
	/* -------------------------------- drag task ------------------------------- */
	/* ------------------------------- delete task ------------------------------ */
	/* -------------------------------- edit task ------------------------------- */
    /* ------------------------------- appendChil ------------------------------- */
    backlogDOM.appendChild(taskEl)
	/* ----------------------- set element to localStorage ---------------------- */
    addTaskToLocalStorage(task)
}



// TODO function - gereratorID
function generatorID() {
	return Math.floor(Math.random() * 100 + 1);
}

// TODO status task - function
function getGroup() {
    return taskGroupOptions[0].value
    // return "higher"
    // if () {return "higher"}
    // if () {return "high"}
    // if () {return "medium"}
    // if () {return "low"}
}
// TODO status task - function
function getStatus() {
    return "higher"
    // if () {return "higher"}
    // if () {return "high"}
    // if () {return "medium"}
    // if () {return "low"}
}


// TODO delete task - function
// TODO edit task - function
// TODO drag task - function


function getTasksFromLocalStorage() {

        const items = JSON.parse(localStorage.getItem("appScrum"));
    
        return items === null ? [] : items;
    
    
}
// TODO addTaskToLocalStorage
function addTaskToLocalStorage(item) {
    console.log(item);
    console.log(getTasksFromLocalStorage());
    let roses = getTasksFromLocalStorage()
    localStorage.setItem("appScrum", JSON.stringify([...roses, item]));
}