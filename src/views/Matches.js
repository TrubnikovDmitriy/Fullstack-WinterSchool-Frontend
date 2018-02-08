
import Views from "../blocks/Views";

export default class Matches extends Views {

	constructor(container) {
		super(container, ["matches"]);
		this.getSidebar().setEntity("Матчи");

		this.buttonAll = this.getSidebar().addButtons("Все матчи");
		this.buttonGridMatch = this.getSidebar().addButtons("Смотреть трансляцию");
		this.buttonGridMatch = this.getSidebar().addButtons("Ключевые события матча");
		this.buttonResult = this.getSidebar().addButtons("Итоги матча");
		this.buttonChange = this.getSidebar().addButtons("Редактировать матч");
	}
}