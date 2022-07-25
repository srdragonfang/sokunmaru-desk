// elements
const postsListDOM = document.querySelector('.posts-list');
// const postTitleDOM = document.querySelector('.post-title');
// const postTextDOM = document.querySelector('.CodeMirror-code');
const postAlertDOM = document.querySelector('.post-alert');
// buttons
const postAddBtn = document.querySelector('.btn-postAdd');
const postApp = document.querySelector('#postApp');
const postPinBtn = document.querySelector('#post-pin');
const postFullScr = document.querySelector('#btn-fullscr');
// edit options
let editTitlePost;
let editTextPost;
let editFlagPost = false;
let editIDPost = '';

var editor = new Editor({
    element: document.querySelector('.post-text')
    // toolbar: []
});

editor.render();
// get value from
const postTitleInput = document.querySelector('.input-post-title');
const postTextInput = document.querySelector('.CodeMirror-code').children[0];
console.log(postTextInput.textContent);
postCreateNew();


// console.log(localStorage.getItem('postList')) 
// ANCHOR:          post conditional
function postCreateNew() {
	postAddBtn.addEventListener('click', () => {
		// console.log('edit status conditional', editIDPost != '');
		// console.log('edit status conditional 1', !!editIDPost);
		// console.log('edit status conditional 2 ', editIDPost != '' && !!editFlagPost);
		if (!editFlagPost) {
			if (postTitleInput.value === '' || postTextInput.textContent === '') {
				postAlertDOM.innerHTML = 'Please fill in the blanks';
			} else if (
				postTitleInput.value !== '' &&
				postTextInput.textContent !== ''
			) {
				createNewPostNew();
				setBackToDefaultNew();
			}
		} else if (editIDPost != '' && !!editFlagPost) {
			console.log(
				'what is',
				editIDPost,
				postTitleInput.value,
				postTextInput.textContent
			);
			console.log('what is', editTitlePost.parentElement);
			editTitlePost.innerHTML = postTitleInput.value;
			editTextPost.innerHTML = postTextInput.textContent;
			editFromLocalStorageNew(
				editIDPost,
				postTitleInput.value,
				postTextInput.textContent
			);
			setBackToDefaultNew();
		}
	});
}

//   ANCHOR *** create new post
function createNewPostNew() {
	let postTitleValue = postTitleInput.value;
	let postTextValue = editor.codemirror.getValue();
	let postID = generateIDNew();
	postRenderNew(postTitleValue, postTextValue, postID);
	addToLocalStorageNew(postID, postTitleValue, postTextValue);
}
function postRenderNew(title, text, id) {
	const post = document.createElement('div');
	post.setAttribute('data-id', id);
	post.classList.add('post');

	post.innerHTML = `
          <div class="post-bar">
              <h3 class="post-title">${title}</h3>
              <i class="fa-solid fa-pencil btn-edit-post"></i>
              <i class="fa-solid fa-xmark btn-del-post"></i>
          </div>
              <p class="post-text">${text}</p>
      `;

	//   const btnPins = document.querySelectorAll(".btn-pin");
	const btnDelPost = post.querySelector('.btn-del-post');
	btnDelPost.addEventListener('click', deletePostNew);
	const btnEditPost = post.querySelector('.btn-edit-post');
	btnEditPost.addEventListener('click', editPostNew);
	postsListDOM.appendChild(post);
}

// ANCHOR *** create random ID
function generateIDNew() {
	return Math.floor(Math.random() * 100 + Math.random() * 10);
	// return Math.floor(Math.random() * postsListDOM.length)
}

// TODO - delete post
function deletePostNew(e) {
	const postEl = e.currentTarget.parentElement.parentElement;
	// get id to remove post from localStorage
	const id = postEl.dataset.id;
	console.log('id post click delete', id);

	postsListDOM.removeChild(postEl);
	removeFromLocalStorageNew(id);
}

// TODO - edit post
function editPostNew(e) {
	const postEl = e.currentTarget.parentElement.parentElement;
	const id = postEl.dataset.id;
    // console.log(postEl) 
	// get element DOM
	editTitlePost = e.currentTarget.parentElement.children[0];
	editTextPost = e.currentTarget.parentElement.parentElement.children[1];

	// get input(title, text) value
	postTitleInput.value = editTitlePost.innerHTML;
	postTextInput.textContent = editTextPost.innerHTML;
	editFlagPost = true;
	editIDPost = postEl.dataset.id;
	console.log('title value before edit', editTitlePost, editIDPost);
}

function setBackToDefaultNew() {
    postTitleInput.value = '';
	postTextInput.textContent = undefined;
    document.querySelector('.post-text').value = '';

	postAlertDOM.innerHTML = '';

	editFlagPost = false;
	editIDPost = '';
	postAddBtn.value = 'Add Post';
}

// ANCHOR *** localStorage
function addToLocalStorageNew(id, title, text) {
	const post = { id, title, text };
	let posts = getLocalStorageNew();
	posts.push(post);
	localStorage.setItem('postList', JSON.stringify(posts));
}

function getLocalStorageNew() {
    // console.log(localStorage.getItem('postList')) 
	return localStorage.getItem('postList')
		? JSON.parse(localStorage.getItem('postList'))
		: [];
}

function setupItemsNew() {
	// get posts from local storage
	let posts = getLocalStorageNew();
	// console.log(posts);
	if (posts.length > 0) {
		posts.forEach((post) => {
            // console.log(post.id, post.title, post.text);
			getPostFromLocalStorageNew(post.id, post.title, post.text);
		});
	}
}

setupItemsNew();
function getPostFromLocalStorageNew(id, title, text) {
	let postTitleValue = title;
	let postTextValue = text;
	let postID = id;
	postRenderNew(postTitleValue, postTextValue, postID);
}

function removeFromLocalStorageNew(id) {
	let posts = getLocalStorageNew();
	console.log('posts before delete', posts);
	console.log('removeFromLocalStorage', id);

	posts = posts.filter(function (post) {
		return post.id != id;
	});

	console.log('posts after deleted', posts);
	localStorage.setItem('postList', JSON.stringify(posts));
}

function editFromLocalStorageNew(id, title, text) {
	let posts = getLocalStorageNew();
	console.log('posts before edit', posts);
	console.log('edit', id);

	posts = posts.filter(function (post) {
		if (post.id == id) {
			post.title = postTitleInput.value;
			post.text = postTextInput.textContent;
		}
		return post;
	});

	console.log('posts after edited', posts);
	localStorage.setItem('postList', JSON.stringify(posts));
}

postPinBtn.addEventListener('click', () => {
	postApp.classList.toggle('pinPost');
	postApp.classList.toggle('post-smallSrc');
});

