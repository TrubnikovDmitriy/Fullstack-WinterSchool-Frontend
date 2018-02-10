'use strict';

import Block from './Block.js';


export default class Table extends Block {

	constructor(container, rows, cols) {

		const table = Block.create('table', {}, ["table", "table-hover"]);
		super(table.el);
		container.append(table.el);

		this.createTable(rows, cols)
	}

	createTable(rows, cols) {

		for (let j = 0; j < rows; ++j) {
			let row = Block.create('tr', {}, []);
			this.append(row);
			for (let i = 0; i < cols; ++i) {
				let col = Block.create('td', {}, []);
				row.append(col);
				col.el.innerHTML = "-"
			}
		}
	}
}
