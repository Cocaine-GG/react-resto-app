export default class RestoService {
	constructor() {
		this._apiBase = 'http://localhost:4000'
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`)

		if (!res.ok) {
			throw new Error(`Could not fetch ${url} , received ${res.status}`)
		}
		return await res.json()
	}

	getMenuItems = async () => {
		return await this.getResource(`/menu/`)
	}
}
