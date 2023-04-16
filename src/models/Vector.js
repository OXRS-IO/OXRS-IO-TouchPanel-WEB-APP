import Utils from "./Utils";


/**
 * Vector math library
 * @author Chris Aitken
 * @link github.com/caitken-com
 */
class Vector extends Array
{
	/**
	 * Getters and Setters
	 */
	set x(value) { this[0] = value; }
	get x() { return this[0]; }

	set y(value) { this[1] = value; }
	get y() { return this[1]; }


	/**
	 * @description Add to vector
	 * @memberof Vector
	 * @param {Vector} vect Vector
	 * @returns {void}
	 */
	add(vect)
	{
		this.forEach((e, i, props) => { props[i] += vect[i]; });
		return this;
	}


	/**
	 * @description Subtract from vector
	 * @memberof Vector
	 * @param {Vector} vect Vector
	 * @returns {void}
	 */
	sub(vect)
	{
		this.forEach((e, i, props) => { props[i] -= vect[i]; });
		return this;
	}


	/**
	 * @description Multiply vector
	 * @memberof Vector
	 * @param {Vector} vect Vector
	 * @returns {void}
	 */
	mul(vect)
	{
		this.forEach((e, i, props) => { props[i] *= vect[i]; });
		return this;
	}


	/**
	 * @description Divide vector
	 * @memberof Vector
	 * @param {Vector} vect Vector
	 * @returns {void}
	 */
	div(vect)
	{
		this.forEach((e, i, props) => { props[i] /= vect[i]; });
		return this;
	}


	/**
	 * @description Sum elements
	 * @memberof Vector
	 * @returns {Number} Sum of elements
	 */
	sum()
	{
		return this.reduce((a, b) => a + b);
	}


	/**
	 * @description Scale elements
	 * @memberof Vector
	 * @param {Number} s - Factor to scale elements by
	 * @returns {void}
	 */
	scale(s)
	{
		this.map((e, i, props) => { props[i] *= s; });
		return this;
	}


	/**
	 * @description Dot product
	 * @memberof Vector
	 * @param {Vector} vect
	 * @returns {Number} Dot product
	 */
	dot(vect)
	{
		return this.clone().mul(vect).sum();
	}


	/**
	 * @description Get length of Vector. Returns the square root of the sum of squares of each element
	 * @memberof Vector
	 * @returns {Number}
	 */
	len()
	{
		return Math.hypot(...this);
	}


	/**
	 * @description Normalize (scale) to a unit vector
	 * @memberof Vector
	 * @returns {Vector} Unit vector
	 */
	normalize()
	{
		return this.scale(1 / this.len());
	}


	/**
	 * @description Negate vector
	 * @memberof Vector
	 * @return {Vector}
	 */
	negate()
	{
		return this.scale(-1);
	}


	/**
	 * @description Set Vector to specific length
	 * @memberof Vector
	 * @param {Number} val
	 * @returns {Vector}
	 */
	setLength(val)
	{
		return this.normalize().scale(val);
	}


	/**
	 * @description Rotate vector by given angle
	 * @memberof Vector
	 * @param {Vector} vect
	 * @param {Number} angle Radians
	 * @param {Boolean} relative Reverse rotation
	 * @returns {void}
	 */
	rotate(angle, reverse)
	{
		reverse = reverse || false;

		const x = this.x;
		const y = this.y;

		const cos = reverse ? Math.sin(angle) : Math.cos(angle);
		const sin = reverse ? Math.cos(angle) : Math.sin(angle);

		this.x = x * cos - y * sin;
		this.y = x * sin + y * cos;

		return this;
	}


	/**
	 * Determine angle of Vector
	 * @memberof Vector
	 * @returns {float} Angle in degrees
	 */
	getAngle()
	{
		let angle = Math.atan2(this.y, this.x);
		return (360 + Math.round(Utils.rad2deg(angle))) % 360;
	}


	/**
	 * @description Set angle of Vector
	 * @memberof Vector
	 * @param {float} degrees Angle
	 * @returns {void}
	 */
	setAngle(degrees)
	{
		let mag = this.len();
		let angle = Utils.deg2rad(degrees);

		this.x = Math.cos(angle);
		this.y = Math.sin(angle);

		this.scale(mag)

		return this;
	}


	/**
	 * @description Clone vector
	 * @memberof Vector
	 * @returns {Vector}
	 */
	clone()
	{
		return new Vector(...this);
	}
}


export default Vector
