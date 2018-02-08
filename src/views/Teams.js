
import Views from "../blocks/Views";

export default class Teams extends Views {

	constructor(container) {
		super(container, ["teams"]);
		this.getSidebar().setEntity("Команды");

		this.buttonAll = this.getSidebar().addButtons("Все команды");
		this.buttonPlayers = this.getSidebar().addButtons("Состав команды");
		this.buttonTourney = this.getSidebar().addButtons("Участие в турнирах");
		this.buttonPrevMatches = this.getSidebar().addButtons("Прошедшие матчи");
		this.buttonNextMatches = this.getSidebar().addButtons("Предстоящие матчи");
		this.buttonChange = this.getSidebar().add("Изменить состав команды")
	}
}