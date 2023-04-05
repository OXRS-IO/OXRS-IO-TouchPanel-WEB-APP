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

				// All other properties
				default:
					this[key] = data[key]
			}
		}

		// Calculate percent between given range
		this.levelPercent = Math.round(((this.level - this.levelStart) / (this.levelStop - this.levelStart)) * 100)
		this.levelPercentStep = Math.round((this.levelStop - this.levelStart) / 20)
	}
}

export default Tile
