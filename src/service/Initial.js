'use strict';

import EventBus from "../modules/EventBus"
import http from "../service/Fetch"

const eventBus = EventBus;


export default function init() {

	initNavigationButtons();
	initAlerts();
	initTooltip();
	initSigning();

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
		eventBus.emit("close_alerts", false);
		scrollTo(0, 0);
		success[0].lastElementChild.innerHTML = message;
		success[0].hidden = false;
	});
	eventBus.on("danger_message", (message) => {
		eventBus.emit("close_alerts", false);
		scrollTo(0, 0);
		danger[0].lastElementChild.innerHTML = message;
		danger[0].hidden = false;
	});
	eventBus.on("info_message", (message) => {
		eventBus.emit("close_alerts", false);
		scrollTo(0, 0);
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

function initSigning() {

	let FormSignIn = document.body.getElementsByClassName("form-sign-in")[0];
	let FormSignUp = document.body.getElementsByClassName("form-sign-up")[0];
	let ButtonSignIn = document.body.getElementsByClassName("button-sign-in")[0];
	let ButtonSignUp = document.body.getElementsByClassName("button-sign-up")[0];

	eventBus.on("hide_all", () => {
		FormSignIn.hidden = true;
		FormSignUp.hidden = true;
	});
	ButtonSignIn.addEventListener('click', () => {
		eventBus.emit("hide_all", false);
		FormSignIn.hidden = false;
	});
	ButtonSignUp.addEventListener('click', () => {
		eventBus.emit("hide_all", false);
		FormSignUp.hidden = false;
	});

	initSignUp(FormSignUp);
	initSignIn(FormSignIn);
}

function initSignUp(signUp) {

	let fields = signUp.firstElementChild.children;
	let emailField = fields[1].children[1];
	let firstNameField = fields[2].children[1];
	let lastNameField = fields[3].children[1];
	let passwordField = fields[4].children[1];
	let submit = fields[5];

	eventBus.on("hide_all", () => {
		emailField.value = "";
		firstNameField.value = "";
		lastNameField.value = "";
		passwordField.value = "";
	});

	submit.addEventListener('click', (event) => {
		event.preventDefault();

		const email = emailField.value;
		const firstName = firstNameField.value;
		const lastName = lastNameField.value;
		const password = passwordField.value;

		http.fetchPost("/v1/persons", {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password
		})
			.then((response) => response.json())
			.then(body => {
				if (body.error_message !== undefined) {
					throw body
				} else {
					eventBus.emit("success_message", "Вы успешно зарегистрировались!")
				}
			})
			.catch(error => {
				let message = error.error_message +
					' (<a target=\'_blank\' href=' + error.href + '>подробности</a>)';
				eventBus.emit("danger_message", message)
			})
	});
}


function initSignIn(signIn) {

	let fields = signIn.firstElementChild.children;
	let emailField = fields[1].children[1];
	let passwordField = fields[2].children[1];
	let submit = fields[3];

	eventBus.on("hide_all", () => {
		emailField.value = "";
		passwordField.value = "";
	});

	submit.addEventListener('click', (event) => {
		event.preventDefault();

		const email = emailField.value;
		const password = passwordField.value;
		let jwt = require('jsonwebtoken');


		http.fetchPost("/v1/oauth/authorize?redirect=http://localhost:5555/v1/app/activate", {
			email: email,
			password: password,
			app_id: '00000000-0000-0000-0000-000000000001',
			scope: 2
		})
			.then((response) => {
				if (response.redirected === true && response.status === 200) {
					eventBus.emit("hide_all", false);

					let access_token = getCookie("ws_auth");
					let decode = jwt.decode(access_token);
					eventBus.emit("success_message",
						"Здравствуйте, " + decode.first_name + " " + decode.last_name);

				} else {
					eventBus.emit("danger_message", response.status + ": " + response.statusText)
				}
			})
	});
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}