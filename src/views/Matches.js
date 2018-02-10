
import Views from "../blocks/Views";
import eventBus from '../modules/EventBus'


export default class Matches extends Views {

	constructor(container) {
		super(container, ["matches"]);
		this.getSidebar().setEntity("Матчи");

		eventBus.on("show_matches", () => {
			eventBus.emit("hide_all", null);
			this.show()
		});

		this.buttonGameMain = this.getSidebar().addButtons("Все матчи");
		this.buttonGridMatch = this.getSidebar().addButtons("Смотреть трансляцию");
		this.buttonGridMatch = this.getSidebar().addButtons("Ключевые события матча");
		this.buttonResult = this.getSidebar().addButtons("Итоги матча");
		this.buttonChange = this.getSidebar().addButtons("Редактировать матч");
	}
}