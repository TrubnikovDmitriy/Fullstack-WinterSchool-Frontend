'use strict';

import Block from './Block.js';
import SideBar from './SideBar.js';
import Content from './Content';
import EventBus from '../modules/EventBus'


export default class Views extends Block {

	constructor(container, classes = []) {
		classes.push('row', 'view');
		const block = Block.create('div', {}, classes);
		super(block.el);
		container.append(block.el);

		const ctx = document.body.getElementsByClassName("row")[0];
		this.sidebar = new SideBar(block.el);
		this.block = block;

		EventBus.on("hide_all", () => this.hide())
	}

	getContainer() {
		return this.block
	}

	getSidebar() {
		return this.sidebar
	}

	setTitle(title) {
		this.sidebar.setTitle(title);
	}

	setAbout(about) {
		this.sidebar.setAbout(about);
	}

	hide() {
		this.el.hidden = true;
	}

	show() {
		this.el.hidden = false;
	}
}

