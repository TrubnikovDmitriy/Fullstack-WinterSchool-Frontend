'use strict';

import Content from "../../blocks/Content"
import Table from "../../blocks/Table"
import http from "../../service/Fetch"
import eventBus from "../../modules/EventBus"


export default class GridMatch extends Content {

	constructor(container) {
		super(container);

		eventBus.on("get_grid", this.createGrid.bind(this));
	}

	createGrid(matches) {
		eventBus.emit("hide_content", null);
		this.show();
		this.clear();
		delete this.table;

		// Определение размеров таблицы
		const grid = matches.grid;
		this.colsCount = Math.log2(grid.length + 1);
		this.rowsCount = grid.length;
		this.table = new Table(this.el, this.rowsCount, this.colsCount);


		// Выставление ячеек
		let parents = [];
		grid.forEach(match => {
			if (match.next_match_id === null) {
				parents.push(match);
			}
		});

		debugger;
		let cell = this.table.el.children[Math.floor(this.rowsCount / 2)].children[this.colsCount - 1];
		this.initCell(cell, parents[0]);

		this.fillGrid(grid, parents, 2);
	}

	fillGrid(grid, parents, elementsInColumn) {

		if (parents.length === 0) return;

		let new_parents = [];
		let step = Math.floor(this.rowsCount / elementsInColumn) + 1;
		let target_row = Math.floor(step / 2) - 1; // первая строчка

		parents.forEach((parent, pos) => {

			for (let i = 0; i < grid.length; ++i) {
				if (grid[i].next_match_id === parent.match_id) {
					let cell = this.table.el
						.children[target_row]
						.children[this.colsCount - 1 - Math.log2(elementsInColumn)];
					this.initCell(cell, grid[i]);

					target_row += step;
					new_parents.push(grid[i])
				}
			}


		});

		this.fillGrid(grid, new_parents, elementsInColumn * 2)
	}

	initCell(cell, match) {

		cell.setAttribute("match-tooltip", match.match_id);

		cell.innerHTML = match.first_team_score + " : " + match.second_team_score;
		cell.classList.add(match.end_time === null ? "table-active" : "table-info");

		cell.setAttribute("started", new Date(match.start_time));
		cell.setAttribute("ended", match.end_time === null ? "Еще не закончился" : new Date(match.end_time));
		cell.setAttribute("href", match.href[0].href);
		// TODO addEventListner на клик
	}
}