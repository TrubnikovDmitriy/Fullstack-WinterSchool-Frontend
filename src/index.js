import Games from "./views/Games";
import Tournaments from "./views/Tournaments";
import Matches from "./views/Matches";
import Teams from "./views/Teams";
import Players from "./views/Players";
import EventBus from "./modules/EventBus"
import init from "./service/Initial"



window.onload = function() {

	const eventBus = EventBus;
	const container = document.body.getElementsByClassName("my-container")[0];

	const game = new Games(container);
	const tournament = new Tournaments(container);
	const matches = new Matches(container);
	const teams = new Teams(container);
	const players = new Players(container);

	init();
};