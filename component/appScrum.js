// TODO get element from DOM
function getElement(selection) {
	const element = document.querySelector(selection);

	if (element) {
		return element;
	}
	throw new Error(
		`Please check ${selection} selector, no such element exists`
	);
}
/* ------------------------------- task group ------------------------------- */
const backlogDOM = getElement('#backlog');
const inprogressDOM = getElement('#inprogress');
const emergencyDOM = getElement('#emergency');
const testingDOM = getElement('#testing');
const doneDOM = getElement('#done');
const removeDOM = getElement('#remove');
/* ------------------------------- task input ------------------------------- */
const taskInput = getElement('#task-input');
const taskSubmit = getElement('#task-submit');
/* ------------------------------- task group option ------------------------------- */
const taskGroupOptions = document.querySelectorAll('.taskGroup-option');

// TODO get element from localStorage

// TODO edit - declare variable (editElement, editFlag)

// TODO eventlistener - task submit
taskSubmit.addEventListener('click', () => {
	if (taskInput.value === '') {
		console.log('check input value conditional:', taskInput.value !== '');
		alert('please fill in the task title');
	} else {
		console.log('check input value conditional:', taskInput.value !== '');
		createNewTask();
		console.log('appScrumDev', getTasksFromLocalStorage());
	}
});

const tasks = getTasksFromLocalStorage();
if (tasks) {
	tasks.forEach((taskLS) => {
		updateTasks(taskLS);
	});
}

// TODO function - createNewTask
function createNewTask() {
	let taskValue = taskInput.value;
	let id = generatorID();
	let title = taskValue;
	let statusGroup = getGroup();
	let statusTask = getStatus();
	/* ----------------------------- create new task ---------------------------- */
	// TODO task - declare object (id, title, statusGroup, statusTask)
	let task = { id, title, statusGroup, statusTask };


	/* ----------------------------- render to html ----------------------------- */
	const taskEl = document.createElement('div');
	taskEl.classList.add('task');
	taskEl.setAttribute('data-id', task.id);
	taskEl.setAttribute('data-statusgroup', task.statusGroup);
	taskEl.innerHTML = `
                   <div class="task-status ${task.statusTask}"></div>
                   <p class="task-content">${task.title}</p>
               `;
	backlogDOM.appendChild(taskEl);
	/* -------------------------------- drag task ------------------------------- */
	/* ------------------------------- delete task ------------------------------ */

    taskEl.addEventListener('dblclick', (e) => {
        e.preventDefault()
        // console.log('dele')
        alert('delete')
        backlogDOM.removeChild(taskEl)
    } )
	/* -------------------------------- edit task ------------------------------- */
	/* ------------------------------- appendChil ------------------------------- */
	/* ----------------------- set element to localStorage ---------------------- */
	addTaskToLocalStorage(task);
}

// TODO function - gereratorID
function generatorID() {
	return Math.floor(Math.random() * 100 + 1);
}

// TODO status task - function
function getGroup() {
	return taskGroupOptions[0].value;
	// return "higher"
	// if () {return "higher"}
	// if () {return "high"}
	// if () {return "medium"}
	// if () {return "low"}
}
// TODO status task - function
function getStatus() {
	return 'higher';
	// if () {return "higher"}
	// if () {return "high"}
	// if () {return "medium"}
	// if () {return "low"}
}

// TODO delete task - function
// TODO edit task - function
// TODO drag task - function

function getTasksFromLocalStorage() {
	const items = JSON.parse(localStorage.getItem('appScrumDev'));

	return items === null ? [] : items;
}
// TODO addTaskToLocalStorage
function addTaskToLocalStorage(item) {
	// console.log(item);
	let roses = getTasksFromLocalStorage();
	localStorage.setItem('appScrumDev', JSON.stringify([...roses, item]));
}

function updateTasks(taskLS) {
    let id = taskLS.id;
    let title = taskLS.title;
    let statusGroup = taskLS.statusGroup;
    let statusTask = taskLS.statusTask;
	/* ----------------------------- create new task ---------------------------- */
	// TODO task - declare object (id, title, statusGroup, statusTask)
	let task = { id, title, statusGroup, statusTask };

	/* ----------------------------- render to html ----------------------------- */
	const taskEl = document.createElement('div');
	taskEl.classList.add('task');
	taskEl.setAttribute('data-id', task.id);
	taskEl.setAttribute('data-statusgroup', task.statusGroup);
	taskEl.innerHTML = `
                   <div class="task-status ${task.statusTask}"></div>
                   <p class="task-content">${task.title}</p>
               `;
	backlogDOM.appendChild(taskEl);
	/* -------------------------------- drag task ------------------------------- */
	/* ------------------------------- delete task ------------------------------ */
	/* -------------------------------- edit task ------------------------------- */
	/* ------------------------------- appendChil ------------------------------- */
	/* ----------------------- set element to localStorage ---------------------- */
}