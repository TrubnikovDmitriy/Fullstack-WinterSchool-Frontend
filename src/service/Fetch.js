'use strict';

const backendUrl = 'http://localhost:5555';

export default class HTTP {

	static fetchGet(address) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json; charset=utf-8');
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: myHeaders,
		});
	}


	static fetchPost(address, body) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json; charset=utf-8');
		return fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: myHeaders
		});
	}
}
HTTP.BaseUrl = null;
