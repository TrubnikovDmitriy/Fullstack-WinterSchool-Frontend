'use strict';

import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'


export default class Teams extends Views {

	constructor(container) {
		super(container, ["teams"]);
		this.getSidebar().setEntity("Команды");

		eventBus.on("show_teams", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});

		this.buttonGameMain = this.getSidebar().addButtons("Все команды");
		this.buttonPlayers = this.getSidebar().addButtons("Состав команды");
		this.buttonTourney = this.getSidebar().addButtons("Участие в турнирах");
		this.buttonPrevMatches = this.getSidebar().addButtons("Прошедшие матчи");
		this.buttonNextMatches = this.getSidebar().addButtons("Предстоящие матчи");
		this.buttonChange = this.getSidebar().addButtons("Изменить состав команды")
	}
}