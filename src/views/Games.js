
import Views from "../blocks/Views";

export default class Games extends Views {

	constructor(container) {
		super(container, ["games"]);
		this.getSidebar().setEntity("Игры");

		this.buttonAll = this.getSidebar().addButtons("Все игры");
		this.buttonAddGame = this.getSidebar().addButtons("Зарегистрировать игру");
	}
}