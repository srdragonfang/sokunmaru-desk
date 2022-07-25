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
const lyricBtn = getElement('.lyric__button');
const lyricDOM = getElement('.sing-a-song');

lyricBtn.addEventListener('click', (e) => {
    e.currentTarget
    lyricDOM.classList.toggle('show')
})