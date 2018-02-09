'use strict';

import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'


export default class Tournaments extends Views {

	constructor(container) {
		super(container, ["tournaments"]);
		this.getSidebar().setEntity("Турниры");

		eventBus.on("show_tournaments", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});

		this.buttonGameMain = this.getSidebar().addButtons("Все турниры");
		this.buttonGridMatch = this.getSidebar().addButtons("Турнирная сетка");
		this.buttonChange = this.getSidebar().addButtons("Редактировать турнир");
		this.buttonAddTourney = this.getSidebar().addButtons("Зарегистрировать турнир");
	}
}