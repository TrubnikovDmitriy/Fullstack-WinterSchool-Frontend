'use strict';

import Content from "../../blocks/Content"
import Card from "../../blocks/Card"
import http from "../../service/Fetch"


export default class GameMain extends Content {

	constructor(container) {
		super(container);
	}

	addGame(title, about) {
		new Card(this.el, "Игра", title, about);
	}

	getGames() {
		http.fetchGet("/v1/games")
			.then(response => {
				alert(response.status);
				return response.json()
			})
			.then(games => {
				alert(games)
			})
			.catch( alert )
	}
}