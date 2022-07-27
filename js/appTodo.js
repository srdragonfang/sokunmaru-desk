// ANCHOR *** select item *******************
const formTodo = document.getElementById('form-1');
const todoList = document.querySelector('.todoList');
const sumTodo = document.querySelector('.sumTo');
const inputText = document.getElementById('inputText');

// ANCHOR *** get data from localStorage
const todos = JSON.parse(localStorage.getItem('dev-todoApp2'));
if (todos) {
	todos.forEach((todoItem) => {
		// load createTodo
		createTodo(todoItem);
	});
}
formTodo.addEventListener('submit', function (e) {
	e.preventDefault();
});

// ANCHOR *** create todo
function createTodo(todoItem) {
	// get data from input
	let todoText = inputText.value;

	if (todoItem) {
		todoText = todoItem.text;
	}

	if (todoText) {
		const todo = document.createElement('div');
		todo.classList.add('todo');
		// kiem tra todo chua lop "completed"
		if (todoItem && todoItem.completed) {
			todo.classList.add('completed');
		}
		todo.innerHTML = `
            <p class="todo-item">${todoText}</p>
          `;
		// todo - completed
		todo.addEventListener('click', (e) => {
			e.preventDefault();
			todo.classList.toggle('completed');
            countTodo()
			updateTodoLS();
		});

		// todo - removed
		todo.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			todo.remove();
			countTodo();
			updateTodoLS();
		});

		//  render to html
		todoList.appendChild(todo);
		countTodo();
		inputText.value = '';
		updateTodoLS();
	}
}

function countTodo() {
	let todoCompleted = document.querySelectorAll('.todo.completed');
	let sum = todoList.children.length - todoCompleted.length;
	if (sum == 0) {
		sumTodo.innerHTML = '';
	}
	sumTodo.innerHTML = '[' + sum + ']';
}

function updateTodoLS() {
	const todosEl = document.querySelectorAll('.todo');
	const todoList = [];
	todosEl.forEach((todoEl) => {
		todoList.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains('completed'),
		});
	});
	localStorage.setItem('dev-todoApp2', JSON.stringify(todoList));
}
