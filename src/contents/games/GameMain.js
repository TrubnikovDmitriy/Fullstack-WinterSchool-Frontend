'use strict';

import Content from "../../blocks/Content"
import Card from "../../blocks/Card"
import http from "../../service/Fetch"
import eventBus from "../../modules/EventBus"


export default class GameMain extends Content {

	constructor(container) {
		super(container);

		eventBus.on("get_games", this.parseGames.bind(this));
	}

	addGame(title, about) {
		new Card(this.el, "Игра", title, about);
	}


	getGames() {
		this.show();
		let length = this.el.children.length;
		for (let i = 0; i < length; ++i) {
			this.el.removeChild(this.el.children[0])
		}
		http.fetchGet("/v1/games?limit=8")
			.then(response => response.json())
			.then(games => eventBus.emit("get_games", games))
			.catch(alert => eventBus.emit("danger_message", alert));
	}

	parseGames(games) {
		for (let i = 0; i < games.length; ++i) {
			this.addGame(games[i].title, games[i].about)
		}
	}
}