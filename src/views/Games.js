'use strict';

import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'
import GameMain from '../contents/games/GamesMain'
import TourneysOfGame from "../contents/games/TourneysOfGame";


export default class Games extends Views {

	constructor(container) {
		super(container, ["games"]);
		this.getSidebar().setEntity("Игра");

		eventBus.on("show_games", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});
		eventBus.on("get_game", (game) => this.getGame(game));


		this.initSideBarButtons();
		this.init();
	}

	initSideBarButtons() {
		this.buttonGameMain = this.getSidebar().addButtons("Все игры");
		this.buttonGameMain.el.addEventListener('click', () => eventBus.emit("GameMain", null), false);

		this.buttonAddGame = this.getSidebar().addButtons("Зарегистрировать игру");
		this.buttonAddGame.el.addEventListener('click', () => this.getSidebar().hideInfo(), false);

	}

	init() {
		this.gameMain = new GameMain(this.getContainer().el);
		eventBus.on("GameMain", () => {
			this.getSidebar().hideInfo();
			this.gameMain.getGames()
		});

		this.tourneysOfGame = new TourneysOfGame(this.getContainer().el);

		eventBus.emit("hide_content", null);
	}

	getGame(game) {
		this.getSidebar().showInfo();
		this.getSidebar().setTitle(game.title);
		this.getSidebar().setAbout(game.about);
	}
}