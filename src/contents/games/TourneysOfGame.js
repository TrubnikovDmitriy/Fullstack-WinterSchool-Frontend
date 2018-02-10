'use strict';

import Content from "../../blocks/Content"
import Card from "../../blocks/Card"
import http from "../../service/Fetch"
import eventBus from "../../modules/EventBus"


export default class TourneysOfGame extends Content {

	constructor(container) {
		super(container);

		eventBus.on("get_game", this.getGame.bind(this));
		eventBus.on("get_tournaments", this.parseTournaments.bind(this));
	}

	getGame(game) {
		eventBus.emit("hide_content", null);
		this.show();
		this.clear();

		http.fetchGet(game.href[1].href + "?limit=8")
			.then(response => response.json())
			.then(tournaments => eventBus.emit("get_tournaments", tournaments))
			.catch(alert => eventBus.emit("danger_message", alert));
	}

	parseTournaments(tournaments) {
		for (let i = 0; i < tournaments.length; ++i) {
			let card = this.addTourney(tournaments[i].title, tournaments[i].about);
			card.el.addEventListener('click', () => this.fetchTourney(tournaments[i].href[0].href), false)
		}
	}


	addTourney(title, about) {
		return new Card(this.el, "Турнир", title, about);
	}

	fetchTourney(url) {
		http.fetchGet(url)
			.then(response => response.json())
			.then(game => eventBus.emit("get_tournament", game))
			.catch(alert => eventBus.emit("danger_message", alert));
	}
}