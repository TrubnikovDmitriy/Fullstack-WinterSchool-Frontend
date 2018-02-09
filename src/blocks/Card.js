'use strict';

import Block from './Block.js';


export default class Content extends Block {

	constructor(container, entity, title, about) {

		const block = Block.create('div', {}, ["card", "text-white", "bg-secondary", "mb-3"]);
		super(block.el);
		container.append(block.el);

		this.createContent(entity, title, about)
	}

	createContent(_entity, _title, _about) {

		let entity = Block.create('div', {}, ['card-header']);
		entity.el.innerHTML = _entity;
		this.append(entity);


		let body = Block.create('div', {}, ['card-body']);
		this.append(body);


		let header = Block.create('h4', {}, ['card-title']);
		header.el.innerHTML = _title;
		body.append(header);


		let about = Block.create('p', {}, ['card-text']);
		about.el.innerHTML = _about;
		body.append(about);
	}
}
