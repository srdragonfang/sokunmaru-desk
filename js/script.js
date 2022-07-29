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
const menuOpen = getElement('#nav-btn-open');
const menuClose = getElement('#nav-btn-close');
const menuContainer = getElement('.menu-container');

menuOpen.addEventListener('click', () => {
    menuOpen.style.display = "none";
    menuContainer.style.display = "flex";
    menuClose.style.display = "block";
})

menuClose.addEventListener('click', () => {
    menuClose.style.display = "none";
    menuContainer.style.display = "none";
    menuOpen.style.display = "block";
})