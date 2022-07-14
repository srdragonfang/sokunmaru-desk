// TODO LIST
// [o] Remove task from localStorage

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
const taskGroupOptions = document.getElementById('sokunmaru');
let getTaskGroupValue = taskGroupOptions.value;
console.log(getTaskGroupValue);

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
	let statusGroup = getTaskGroup();
    console.log("task statusGroup set", statusGroup);
	// let statusGroup = 'Done';
	let statusTask = getTaskStatus();

	// TODO task - declare object (id, title, statusGroup, statusTask)
	let task = { id, title, statusGroup, statusTask };
	/* ----------------------- render tasks ---------------------- */
	createTask(task);
	/* ----------------------- set task to localStorage ---------------------- */
	addTaskToLocalStorage(task);
}

// TODO render tasks to html
function createTask(task) {
	/* ----------------------------- render to html ----------------------------- */
	const taskEl = document.createElement('div');
	taskEl.classList.add('task');
	taskEl.setAttribute('data-id', task.id);
	taskEl.setAttribute('data-statusgroup', task.statusGroup);
	taskEl.innerHTML = `
                   <div class="task-status ${task.statusTask}"></div>
                   <p class="task-content">${task.title}</p>
               `;
	/* -------------------------------- drag task ------------------------------- */
	/* ------------------------------- delete task ------------------------------ */

	taskEl.addEventListener('dblclick', (e) => {
		e.preventDefault();
		if (
			confirm(
				'Are you sure you want to delete this task into the database?'
			)
		) {
			// Save it!
			console.log('Task was deleted to the database.');
			backlogDOM.removeChild(taskEl);
			removeTaskFromLocalStorage(task.id);
		} else {
			// Do nothing!
			console.log('Task was not deleted to the database.');
		}
	});
	/* -------------------------------- edit task ------------------------------- */
	/* ------------------------------- appendChil ------------------------------- */
	if (task.statusGroup == 'Done') {
		doneDOM.appendChild(taskEl);
	} else if (task.statusGroup == 'Testing') {
		testingDOM.appendChild(taskEl);
	} else if (task.statusGroup == 'Emergency') {
		emergencyDOM.appendChild(taskEl);
	} else if (task.statusGroup == 'InProgress') {
		inprogressDOM.appendChild(taskEl);
	} else {
		backlogDOM.appendChild(taskEl);
	}
}

// TODO function - gereratorID
function generatorID() {
	return Math.floor(Math.random() * 100 + 1);
}

// TODO status task - function
function getTaskGroup() {
	taskGroupOptions.addEventListener('change', (e) => {
		getTaskGroupValue = e.target.value;
        console.log("taskGroup Now", getTaskGroupValue);
	});
    return getTaskGroupValue;
}
// TODO status task - function
function getTaskStatus() {
	return 'higher';
	// if () {return "higher"}
	// if () {return "high"}
	// if () {return "medium"}
	// if () {return "low"}
}

function getTasksFromLocalStorage() {
	const items = JSON.parse(localStorage.getItem('appScrumDev'));
	return items === null ? [] : items;
}
// TODO add tasks to localStorage
function addTaskToLocalStorage(item) {
	// console.log(item);
	let roses = getTasksFromLocalStorage();
	localStorage.setItem('appScrumDev', JSON.stringify([...roses, item]));
}

// TODO render tasks from localStorage
function updateTasks(taskLS) {
	let id = taskLS.id;
	let title = taskLS.title;
	let statusGroup = taskLS.statusGroup;
	let statusTask = taskLS.statusTask;
	/* ----------------------------- create new task ---------------------------- */
	// TODO task - declare object (id, title, statusGroup, statusTask)
	let task = { id, title, statusGroup, statusTask };
	createTask(task);
}

// TODO remove task from localStorage
function removeTaskFromLocalStorage(id) {
	let tasks = getTasksFromLocalStorage().filter(function (task) {
		return task.id !== id;
	});
	console.log('taskList after deleted', tasks);
	localStorage.setItem('appScrumDev', JSON.stringify(tasks));
}
