'use strict';

import Block from './Block.js';


export default class SideBar extends Block {

	constructor(container) {
		const block = Block.create('div', {}, ['card', 'col-sm-3', 'sidebar']);
		super(block.el);
		container.append(block.el);

		this.createContent()
	}

	createContent() {

		this.title = Block.create('h3', {}, ['card-header']);
		this.append(this.title);


		const entityDiv = Block.create('div', {}, ['card-body']);
		this.append(entityDiv);
		this.entity = Block.create('h5', {}, ['card-title']);
		entityDiv.append(this.entity);


		this.image = Block.create('img', {"alt": "Card image", "style":"height: 200px; width: 100%; display: block;", "src":"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"}, []);
		this.append(this.image);


		const body = Block.create('div', {}, ['card-body']);
		this.append(body);
		this.about = Block.create('p', {}, ['card-text']);
		body.append(this.about);


		this.buttons = Block.create('ul', {}, ["list-group", "list-group-flush"]);
		this.append(this.buttons);


		this.author = Block.create('div', {}, ["card-footer", "text-muted"]);
		this.append(this.author);
	}

	setEntity(text) {
		this.entity.el.innerHTML = text
	}

	setTitle(text) {
		this.title.el.innerHTML = text
	}

	setImage(src) {

	}

	setAbout(text) {
		this.about.el.innerHTML = text
	}

	addButtons(buttonText) {
		let node = Block.create('li', {}, ["list-group-item"]);
		node.el.innerHTML = buttonText;
		this.buttons.append(node);
		return node
	}

	setAuthor(text) {
		this.author.el.innerHTML = text
	}
}