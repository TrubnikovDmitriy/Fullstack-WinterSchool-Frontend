'use strict';

import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'
import http from "../service/Fetch"
import GridMatch from "../contents/tournaments/GridMatch";


export default class Tournaments extends Views {

	constructor(container) {
		super(container, ["tournaments"]);
		this.getSidebar().setEntity("Турнир");

		// Нажатие на кнопку на навбаре
		eventBus.on("show_tournaments", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});

		// Нажатие на турнир из View-Game (fetch вернулся)
		eventBus.on("get_tournament", (tournament) => {
			eventBus.emit("show_tournaments", null);
			this.initSideBarInfo(tournament)
		});

		this.initSideBarButtons();
		this.initContent();
	}

	initSideBarButtons() {

		this.buttonGridMatch = this.getSidebar().addButtons("Турнирная сетка");
		this.buttonGridMatch.el.addEventListener('click', () => {
			let url = this.buttonGridMatch.el.getAttribute("href");
			if (url === null) {
				eventBus.emit("info_message", "Выберите турнир из доступных игр")
			} else {
				http.fetchGet(url)
					.then(response => response.json())
					.then(matches => eventBus.emit("get_grid", matches))
					.catch(alert => eventBus.emit("danger_message", alert));
			}
		},false);


		this.buttonTeams = this.getSidebar().addButtons("Команды участницы");
		this.buttonTeams.el.addEventListener('click', () => {
			let url = this.buttonTeams.el.getAttribute("href");
			if (url === null) {
				eventBus.emit("info_message", "Выберите турнир из доступных игр")
			} else {
				http.fetchGet(url)
			}
		},false);


		this.buttonChange = this.getSidebar().addButtons("Изменить описание турнира");
		this.buttonCreateTourney = this.getSidebar().addButtons("Зарегистрировать турнир");
	}

	initSideBarInfo(tournament) {
		this.setTitle(tournament.title);
		let about =
			"<u>Описание:</u> " + tournament.about + "</br></br>" +
			"<u>Открытие турнира:</u> " + new Date(tournament.started) + "</br>" +
			"<u>Закрытие турнира:</u> " + new Date(tournament.ended);
		this.setAbout(about);

		this.buttonGridMatch.el.setAttribute("href", tournament.href[1].href);
		this.buttonTeams.el.setAttribute("href", tournament.href[2].href);
	}

	initContent() {
		this.gridMatches = new GridMatch(this.getContainer().el)

		eventBus.emit("hide_content", null);
	}
}
