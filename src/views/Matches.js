
import Views from "../blocks/Views";
import http from "../service/Fetch"
import eventBus from '../modules/EventBus'


export default class Matches extends Views {

	constructor(container) {
		super(container, ["matches"]);
		this.getSidebar().setEntity("Матч");

		eventBus.on("show_matches", () => {
			eventBus.emit("hide_all", null);
			this.show();
		});
		// Нажатие на турнир из View-Game (fetch вернулся)
		eventBus.on("get_match", (match) => {
			eventBus.emit("show_matches", null);
			this.initSideBarInfo(match)
		});

		this.initSideBarButtons();
	}

	initSideBarButtons() {

		this.buttonMatchTeams = this.getSidebar().addButtons("Составы команд");


		this.buttonToTournament = this.getSidebar().addButtons("Перейти к турниру");
		this.buttonToTournament.el.addEventListener('click', () => {
			let url = this.buttonToTournament.el.getAttribute("href");
			if (url === null) {
				eventBus.emit("info_message", "Выберите матч из турнира")
			} else {
				http.fetchGet(url)
					.then(response => response.json())
					.then(tournament => eventBus.emit("get_tournament", tournament))
					.catch(alert => eventBus.emit("danger_message", alert));
			}
		},false);


		this.buttonKeyEvents = this.getSidebar().addButtons("Ключевые события матча");


		this.buttonCreateEvent = this.getSidebar().addButtons("Оставить комментарий");
	}

	initSideBarInfo(match) {
		this.setTitle(match.first_team_score + " : " + match.second_team_score);
		// this.getSidebar().title.el.style.textAlign = "center";

		let about =
			"<u>Начало матча:</u> " + new Date(match.start_time) + "</br>" +
			"<u>Конец матча:</u> " + (match.end_time !== null ?
			new Date(match.end_time) : "Еще не закончился");
		this.setAbout(about);

		this.buttonToTournament.el.setAttribute("href", match.href[0].href);
		this.buttonKeyEvents.el.setAttribute("href", match.href[1].href);
		this.buttonCreateEvent.el.setAttribute("href", match.href[2].href);
	}

}