/**
 * Utilities library
 * @author Chris Aitken
 * @link github.com/caitken-com
 */
class Utils
{
	/**
	 * @description Convert degrees to radians
	 * @memberof Colour
	 * @param {Number} degrees
	 * @returns {Number}
	 */
	static deg2rad(degrees)
	{
		return degrees * (Math.PI / 180);
	}


	/**
	 * @description Convert radians to degrees
	 * @memberof Colour
	 * @param {Number} radians
	 * @returns {Number}
	 */
	static rad2deg(radians)
	{
		return radians * (180 / Math.PI);
	}


	/**
	 * @description Clamp given value between min and max values
	 * @param {Number} value Value to clamp
	 * @param {Number} min Minimum value
	 * @param {Number} max Maximum value
	 * @returns {Number}
	 */
	static clamp(value, min, max)
	{
		return Math.min(Math.max(value, min), max);
	}
}


export default Utils
