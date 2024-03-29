import Tile from '@/models/Tile'


class Screen
{
	_app = null
	id = null
	label = null
	hidden = false
	tiles = []
	footer = {
		'left': '',
		'center': '',
		'right': ''
	}
	backgroundColorRgb = {r: 0, g: 0, b: 0}
	footerColours = {
		'left': '#fff',
		'center': '#fff',
		'right': '#fff'
	}


	/**
	 * @description Initialise Screen
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Object} data Collection of screen properties
	 * @param {Object} App instance
	 * @returns {Screen}
	 */
	constructor(data, app)
	{
		this._app = app;
		this.update(data)
	}


	/**
	 * @description Populate screen properties
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Object} data
	 * @returns {void}
	 */
	update(data)
	{
		let tiles = []

		for (let key in data)
		{
			switch (key)
			{
				// Set ID
				case 'screen':
					this.id = data[key]
					break

				// Populate tiles afterwards, see below
				case 'tiles':
					tiles = data[key]
					break

				// Populate footer text
				// (#[a-fA-F0-9]+)
				case 'footer':
					if (typeof data[key] != 'object') data[key] = {}

					this.footerColours = {
						'left': '#fff',
						'center': '#fff',
						'right': '#fff'
					}

					this.footer.left = ('left' in data[key]) ? this.updateFooter(data[key]['left'], 'left') : null
					this.footer.center = ('center' in data[key]) ? this.updateFooter(data[key]['center'], 'center') : null
					this.footer.right = ('right' in data[key]) ? this.updateFooter(data[key]['right'], 'right') : null
					break

				case 'backgroundColorRgb':
					if (typeof data[key] != "object") data[key] = {}

					this.backgroundColorRgb.r = (('r' in data[key]) && !isNaN(data[key]['r'])) ? data[key]['r'] : 0
					this.backgroundColorRgb.g = (('g' in data[key]) && !isNaN(data[key]['g'])) ? data[key]['g'] : 0
					this.backgroundColorRgb.b = (('b' in data[key]) && !isNaN(data[key]['b'])) ? data[key]['b'] : 0

					this._app.setBgColour(this.backgroundColorRgb)
					break

				// All other screen properties
				default:
					this[key] = data[key]
					break

			}
		}

		// Populate tiles after all screen properties are set
		if (tiles.length > 0) this.updateTiles(tiles)
	}


	/**
	 * @description Find Tile by its ID
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Number} id Tile ID
	 * @returns {Tile}
	 */
	getTile(id)
	{
		for (let i in this.tiles)
		{
			if (!('id' in this.tiles[i])) continue
			if (this.tiles[i].id != id) continue
			return this.tiles[i]
		}
		return null
	}


	/**
	 * @description Add tile to this screen
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Object} tile
	 * @returns {void}
	 */
	addTile(tile)
	{
		tile.screen = this.id
		this.tiles.push(new Tile(tile, this._app))
	}


	/**
	 * @description Remove tile from screen
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Number} id Tile ID
	 * @returns {void}
	 */
	removeTile(id)
	{
		for (let i in this.tiles)
		{
			if (!('id' in this.tiles[i])) continue
			if (this.tiles[i].id != id) continue
			delete this.tiles[i]
			break
		}
	}


	/**
	 * @description Add tiles to screen
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Array} list
	 * @returns {void}
	 */
	updateTiles(list)
	{
		for (let idx in list)
		{
			let tile = this.getTile(list[idx].tile)

			if (tile)
			{
				tile.update(list[idx])
			}
			else
			{
				this.addTile(list[idx])
			}
		}
	}


	/**
	 * Extract color format from footer string
	 * @param {string} input `#RRGGBB label#`|`Label`
	 * @param {string} column `left|center|right`
	 * @returns {string} Label part of input
	 */
	updateFooter(input, column)
	{
		const pattern = /#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\s(.*)#/g
		const matches = pattern.exec(input)

		// No colour style, reset
		if (matches == null) return input

		// Apply colour style, and return label
		this.footerColours[column] = `#${matches[1]}`
		return matches[4]
	}
}


export default Screen
