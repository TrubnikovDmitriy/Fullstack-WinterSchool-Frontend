'use strict';

import EventBus from "../modules/EventBus"


export default function init() {

	const eventBus = EventBus;
	eventBus.emit("hide_all", null);

	// Навешиваем события на кнопки navbar'a
	let navButtons = document.body.getElementsByClassName("nav-item");
	for (let i = 0; i < navButtons.length; ++i) {
		eventBus.on("hide_all", () => {
			let classes = navButtons[i].className.split(' ');
			for (let i = 0; i < classes.length; i++) {
				if (classes[i] === 'active') {
					classes.splice(i, 1);
					i--;
				}
			}
			navButtons[i].className = classes.join(' ');
		});
		let classes = navButtons[i].className.split(' ');
		let eventName = "show_" + classes[classes.length - 1];
		console.log(eventName);
		navButtons[i].addEventListener('click', () => {
			eventBus.emit(eventName, null);
			navButtons[i].className += ' active';
		}, false);
	}
	document.backendURL = 'http://localhost:5555';
}