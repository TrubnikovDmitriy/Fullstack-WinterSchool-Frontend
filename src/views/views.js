'use strict';

// key frames
import Block from './block.js';


/**
 * Класс базовой вьюхи
 * @module ViewButton
 */
export default class Views extends Block {
	/**
	 * @param {*} blocks
	 * @constructor
	 */
	constructor(container) {
		const block = Block.create('div', {}, ['view']);
		super(block.el);
		container.append(this)
	}


	/**
	 * Показывает вьюху
	 */
	show() {
		setTimeout(() => {
			this.el.style.setProperty('display', 'flex');
		}, 170);
		setTimeout(() => {
			this.el.classList.remove('main_hidden');
		}, 130);
		this.hidden = false;
	}


	/**
	 * Скрывает вьюху
	 */
	hide() {
		this.el.classList.add('main_hidden');
		setTimeout(() => {
			this.el.style.setProperty('display', 'none');
		}, 170);
		this.hidden = true;
	}
}

