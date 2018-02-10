'use strict';

import Block from './Block.js';
import eventBus from '../modules/EventBus'


export default class Content extends Block {

	constructor(container) {
		const block = Block.create('div', {}, ['col-sm-9', 'content']);
		super(block.el);
		eventBus.on("hide_content", () => this.el.hidden = true);
		container.append(block.el);
	}

	clear() {
		let length = this.el.children.length;
		for (let i = 0; i < length; ++i) {
			this.el.removeChild(this.el.children[0])
		}
	}
}
