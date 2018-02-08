
import Views from "../blocks/Views";

export default class Tournaments extends Views {

	constructor(container) {
		super(container, ["tournaments"]);
		this.getSidebar().setEntity("Турниры");

		this.buttonAll = this.getSidebar().addButtons("Все турниры");
		this.buttonGridMatch = this.getSidebar().addButtons("Турнирная сетка");
		this.buttonChange = this.getSidebar().addButtons("Редактировать турнир");
		this.buttonAddTourney = this.getSidebar().addButtons("Зарегистрировать турнир");
	}
}