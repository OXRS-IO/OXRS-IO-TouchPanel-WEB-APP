/**
 * Colour space library
 * @author Chris Aitken
 * @link github.com/caitken-com
 */
class Colour
{
	/**
	 * @descriptionConvert RGB to HSB/V color space
	 * @memberof Colour
	 * @param {int} r Red channel
	 * @param {int} g Green channel
	 * @param {int} b Blue channel
	 * @return {Object} {(int) h, (int) s, (int) b}
	 */
	static rgb2hsb(r, g, b)
	{
		r /= 255;
		g /= 255;
		b /= 255;
		const v = Math.max(r, g, b);
		const n = v - Math.min(r, g, b);
		const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
		return {h: Math.round(60 * (h < 0 ? h + 6 : h)), s: Math.round(v && (n / v) * 100), b: Math.round(v * 100)};
	}


	/**
	 * @description Convert HSB/V to RGB colour space
	 * @memberof Colour
	 * @param {int} h Hue
	 * @param {int} s Saturation
	 * @param {int} b Brightness
	 * @return {object} {(int) r, (int) g, (int) b}
	 */
	static hsb2rgb(h, s, b)
	{
		s /= 100;
		b /= 100;
		const k = (n) => (n + h / 60) % 6;
		const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
		return {r: Math.round(255 * f(5)), g: Math.round(255 * f(3)), b: Math.round(255 * f(1))};
	}


	/**
	 * @description Convert X/Y cords to HSB/V
	 * @memberof Colour
	 * @param {Vector} vect
	 * @param {float} radius
	 * @param {int} bri Brightness
	 * @return {object} {{float} h, (float) s, (float) b}
	 */
	static vect2hsb(vect, radius, bri)
	{
		let hue = vect.getAngle();
		let saturation = vect.len() / radius * 100;

		return {h: hue, s: Math.round(saturation), b: bri};
	}


	/**
	 * @description Convert HSB to vector cords
	 * @param {int} h
	 * @param {int} s
	 * @param {Vector} vect
	 * @param {Number} radius
	 */
	static hsb2vect(h, s, vect, radius)
	{
		// Reset
		vect.x = 1;
		vect.y = 1;

		// Apply saturation
		vect.setLength((s/100) * radius);

		// Apply Hue
		vect.setAngle(h);

		return vect;
	}
}


export default Colour
