import Views from "./blocks/Views";

window.onload = function() {

	const container = document.body.getElementsByClassName("my-container")[0];
	const view = new Views(container, ['team'])
};