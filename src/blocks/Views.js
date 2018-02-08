'use strict';

// key frames
import Block from './Block.js';
import SideBar from './SideBar.js';
import Content from "./Content";


/**
 * Класс базовой вьюхи
 * @module ViewButton
 */
export default class Views extends Block {
	/**
	 * @param {*} container
	 * @param {string} [classes] - список имён классов
	 * @constructor
	 */
	constructor(container, classes = []) {
		classes.push('row', 'view');
		const block = Block.create('div', {}, classes);
		super(block.el);
		container.append(block.el);

		const ctx = document.body.getElementsByClassName("row")[0];
		this.sidebar = new SideBar(block.el);
		this.content = new Content(block.el);
	}


	/**
	 * Показывает вьюху
	 */
	show() {
		// this.el.classList.remove('main_hidden');
		this.hidden = false;
	}


	/**
	 * Скрывает вьюху
	 */
	hide() {
		// this.el.classList.add('main_hidden');
		this.hidden = true;
	}
}

