'use strict';

import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'
import GameMain from '../contents/games/GameMain'


export default class Games extends Views {

	constructor(container) {
		super(container, ["games"]);
		this.getSidebar().setEntity("Игры");

		eventBus.on("show_games", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});

		this.initSideBarButtons();
		this.init();
	}

	initSideBarButtons() {
		this.buttonGameMain = this.getSidebar().addButtons("Все игры");
		this.buttonGameMain.el.addEventListener('click', () => eventBus.emit("GameMain", null), false);

		this.buttonAddGame = this.getSidebar().addButtons("Зарегистрировать игру");
	}

	init() {
		this.gameMain = new GameMain(this.getContainer().el);
		this.gameMain.hide();

		eventBus.on("GameMain", () => {
			this.gameMain.show();
			this.gameMain.getGames()
		});
	}
}