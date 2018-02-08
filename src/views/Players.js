
import Views from "../blocks/Views";

export default class Players extends Views {

	constructor(container) {
		super(container, ["players"]);
		this.getSidebar().setEntity("Игроки");

		this.buttonAll = this.getSidebar().addButtons("Все игроки");
		this.buttonInfo = this.getSidebar().addButtons("Карьера");
	}
}