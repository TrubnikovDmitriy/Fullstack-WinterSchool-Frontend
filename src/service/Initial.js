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
		navButtons[i].addEventListener('click', () => {
			eventBus.emit(eventName, null);
			navButtons[i].className += ' active';
		}, false);
	}

	// Навешиваем события на кнопки алертов
	let success = document.body.getElementsByClassName("alert-success");
	let danger = document.body.getElementsByClassName("alert-danger");
	let info = document.body.getElementsByClassName("alert-info");


	eventBus.on("close_alerts", () => {
		success[0].hidden = true;
		danger[0].hidden = true;
		info[0].hidden = true;
	});

	eventBus.on("success_message", (message) => {
		success[0].innerHTML = "<strong>Well done!</strong> " + message;
		success[0].hidden = false;
	});
	eventBus.on("danger_message", (message) => {
		danger[0].lastElementChild.innerHTML = message;
		// danger[0].innerHTML = "<strong>Error!</strong> " + message;
		danger[0].hidden = false;
	});
	eventBus.on("info_message", (message) => {
		info[0].innerHTML = "<strong>Information!</strong> " + message;
		info[0].hidden = false;
	});

	let closeCrosses = document.body.getElementsByClassName("close");
	for (let i = 0; i < closeCrosses.length; ++i) {
		closeCrosses[i].addEventListener('click', () => eventBus.emit("close_alerts"));
	}
}