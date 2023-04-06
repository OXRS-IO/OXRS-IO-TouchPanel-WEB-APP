class Tile
{
	id = null
	screen = null
	label = null
	subLabel = null
	style = null
	icon = null
	state = 'off'
	levelStart = 0
	levelStop = 100
	levelPercent = 0
	levelPercentStep = 0
	level = 0
	colorRgb = []
	bgImage = []
	dropDownList = []
	dropDownSelect = null
	dropDownLabel = null
	selectorList = null
	selectorSelect = null
	colorPicker = null
	link = null
	value = null
	units = null
	subValue = null
	subUnits = null
	enabled = true
	iconColorRgb = {r: 91, g: 190, b: 91}
	backgroundImage = {imageBase64: null, zoom: 0, angle: 0, offset: [0,0]}


	/**
	 * @description Initialise Tile
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Object} data Collection of tile properties
	 * @returns {Tile}
	 */
	constructor(data)
	{
		this.update(data)
	}


	/**
	 * @description Update the tile's properties
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {Object} data Collection of tile properties
	 * @returns {void}
	 */
	update(data)
	{
		for (let key in data)
		{
			switch (key)
			{
				case 'tile':
					this.id = data[key]
					break;

				// Indicator
				case 'number':
					this.value = (typeof data[key]['value'] != 'undefined') ? data[key]['value'] : null;
					this.units = (typeof data[key]['units'] != 'undefined') ? data[key]['units'] : null;
					this.subValue = (typeof data[key]['subValue'] != 'undefined') ? data[key]['subValue'] : null;
					this.subUnits = (typeof data[key]['subUnits'] != 'undefined') ? data[key]['subUnits'] : null;
					break;

				case 'action':
					// Determine if this tile is enabled or disabled
					if (Array('disable', 'enable').includes(data[key])) this.enabled = data[key] == 'enable' ? true : false
					break;

				// Active state color
				case 'iconColorRgb':
					if (typeof data[key] != "object") data[key] = {}

					this.iconColorRgb.r = (('r' in data[key]) && !isNaN(data[key]['r'])) ? data[key]['r'] : 91
					this.iconColorRgb.g = (('g' in data[key]) && !isNaN(data[key]['g'])) ? data[key]['g'] : 190
					this.iconColorRgb.b = (('b' in data[key]) && !isNaN(data[key]['b'])) ? data[key]['b'] : 91
					break;

				// Background image
				case 'backgroundImage':
					if (typeof data[key] != "object") data[key] = {}

					this.backgroundImage.imageBase64 = ('imageBase64' in data[key]) ? (this.detectMimeType(data[key]['imageBase64']) ? `${this.detectMimeType(data[key]['imageBase64'])}${data[key]['imageBase64']}` : null) : null
					this.backgroundImage.zoom = (('zoom' in data[key]) && !isNaN(data[key]['zoom'])) ? data[key]['zoom'] : 0
					this.backgroundImage.angle = (('angle' in data[key]) && !isNaN(data[key]['angle'])) ? data[key]['angle'] : 0
					this.backgroundImage.offset = ('offset' in data[key]) ? [parseInt(data[key]['offset'][0]), parseInt(data[key]['offset'][1])] : [0,0]

				// All other properties
				default:
					this[key] = data[key]
			}
		}

		// Calculate percent between given range
		this.levelPercent = Math.round(((this.level - this.levelStart) / (this.levelStop - this.levelStart)) * 100)
		this.levelPercentStep = Math.round((this.levelStop - this.levelStart) / 20)
	}


	/**
	 * @description Determine mime type from base64 encoded string
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @param {string} base64
	 */
	detectMimeType(base64)
	{
		const signatures = {
			'R0lGOD': 'data:image/gif;base64,',
			'iVBORw0KGgo': 'data:image/png;base64,',
			'/9j/': 'data:image/jpg;base64,',
			'PHN2Zy': 'data:image/svg+xml;base64,',
			'Qk0=': 'data:image/bmp;base64,',
		}

		for (let s in signatures)
		{
			if (String(base64).indexOf(s) === 0) return signatures[s];
		}

		return false;
	}
}

export default Tile
