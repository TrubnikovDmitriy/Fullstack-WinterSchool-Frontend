'use strict';

import Block from './Block.js';


export default class Content extends Block {

	constructor(container) {
		const block = Block.create('div', {}, ['col-sm-9', 'content']);
		super(block.el);
		container.append(block.el);
	}
}
