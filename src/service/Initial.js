'use strict';

import EventBus from "../modules/EventBus"

const eventBus = EventBus;


export default function init() {

	initNavigationButtons();
	initAlerts();
	initTooltip();

	eventBus.emit("hide_all", null);
}

function initNavigationButtons() {

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
}

function initAlerts() {

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
		success[0].lastElementChild.innerHTML = message;
		success[0].hidden = false;
	});
	eventBus.on("danger_message", (message) => {
		danger[0].lastElementChild.innerHTML = message;
		danger[0].hidden = false;
	});
	eventBus.on("info_message", (message) => {
		info[0].lastElementChild.innerHTML = message;
		info[0].hidden = false;
	});

	let closeCrosses = document.body.getElementsByClassName("close");
	for (let i = 0; i < closeCrosses.length; ++i) {
		closeCrosses[i].addEventListener('click', () => eventBus.emit("close_alerts"));
	}
}

function initTooltip() {

	const paddingY = 15;
	const paddingX = 25;

	let tooltip = document.body.getElementsByClassName('my-tooltip')[0];

	// Отображение текста
	document.onmousemove = (event) => {
		if ( !event.target.hasAttribute('match-tooltip') ) return;

		// Считывание информации о матче
		tooltip.firstElementChild.innerHTML = "№ " + event.target.getAttribute('match-tooltip');
		tooltip.lastElementChild.lastElementChild.innerHTML =
			"<i>Начало матча:</i> " + event.target.getAttribute('started') + '</br>' +
			"<i>Конец матча:</i> " + event.target.getAttribute('ended') + '</br>';


		// Ограничения, чтоб не выходил за границу
		let x = event.pageX - tooltip.clientWidth / 2;
		let y = event.pageY - tooltip.clientHeight - paddingY;

		if ( x < 0 ) {
			x = 0;
		}
		if ( x > document.body.clientWidth - tooltip.clientWidth - paddingX ) {
			x = document.body.clientWidth - tooltip.clientWidth - paddingX;
		}
		if ( tooltip.clientHeight + paddingY > event.clientY ) {
			y = event.pageY + paddingY;
		}

		tooltip.style.left = x + 'px';
		tooltip.style.top = y + 'px';
	};

	// Появление/исчезновние всплывающей подсказки
	document.onmouseover = (event) => {
		if ( !event.target.hasAttribute('match-tooltip') ) return;
		tooltip.style.opacity = 1;
	};
	document.onmouseout = (event) => {
		if ( !event.target.hasAttribute('match-tooltip') ) return;
		tooltip.style.opacity = 0;
	};

}