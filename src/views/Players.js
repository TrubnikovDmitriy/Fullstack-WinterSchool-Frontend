'use strict';

import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'


export default class Players extends Views {

	constructor(container) {
		super(container, ["players"]);
		this.getSidebar().setEntity("Игроки");

		eventBus.on("show_players", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});

		this.buttonGameMain = this.getSidebar().addButtons("Все игроки");
		this.buttonInfo = this.getSidebar().addButtons("Карьера");
	}
}