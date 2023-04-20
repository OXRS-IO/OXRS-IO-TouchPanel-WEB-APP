<script setup>
import Vector from '@/models/Vector.js'
import Colour from '@/models/Colour.js'
import Utils from '@/models/Utils.js'


defineProps({
	tile: {
		type: Object,
		required: true,
	},
})
</script>

<script>
export default
{
	/**
	 * @description Prep tiles list ready for populating
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {Object}
	 */
	data()
	{
		return {
			wheel_height: null,
			footer_width: null,
			drag_event: null,
			vect1: new Vector(0,0),
			vect2: new Vector(0,0),
			colour: {h: 0, s: 0, b: 100},
			sliderColour: {r: 255, g: 255, b: 255},
		}
	},



	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {Object}
		 */
		cssVars()
		{
			return {
				'--wheel-height': `${this.wheel_height}px`,
				'--footer-icon-width': `${this.footer_width}px`,
				'--puck-colour': `rgb(${this.tile.colorRgb.r}, ${this.tile.colorRgb.g}, ${this.tile.colorRgb.b})`,
				'--slider-colour': `rgb(${this.sliderColour.r}, ${this.sliderColour.g}, ${this.sliderColour.b})`
			}
		}
	},


	methods:
	{
		/**
		 * @description Mouse down event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `back|state`
		 * @return {void}
		 */
		mouseDown(type)
		{
			switch (type)
			{
				case 'back':
					this.buttonBack()
					break

				case 'state':
					this.buttonState()
					break

				case 'colour':
					this.setColour(window.event)

					this.drag_event = (event) => this.mouseMove(event, type)
					document.addEventListener('mousemove', this.drag_event)
					document.addEventListener('touchmove', this.drag_event)
					break

				case 'brightness':
					this.setBrightness(window.event)

					this.drag_event = (event) => this.mouseMove(event, type)
					document.addEventListener('mousemove', this.drag_event)
					document.addEventListener('touchmove', this.drag_event)
					break
			}
		},


		/**
		 * @description Mouse up event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		mouseUp(type)
		{
			switch (type)
			{
				case 'colour':
				case 'brightness':
					if (!this.drag_event) break

					document.removeEventListener('mousemove', this.drag_event)
					document.removeEventListener('touchmove', this.drag_event)

					this.drag_event = null
					this.buttonColour()
					break
			}
		},



		/**
		 * @description Colour picker mouse move
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		mouseMove(event, type)
		{
			switch(type)
			{
				case 'colour':
					this.setColour(event)
					break

				case 'brightness':
					this.setBrightness(event)
					break
			}
		},



		/**
		 * @description Navigate back to tile's screen
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		buttonBack()
		{
			this.$root.navigateToUrl(`/screen/${this.tile.screen}`)
		},


		/**
		 * @description Send press event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		buttonState()
		{
			let payload = {};
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = 'button'
			payload.state = this.tile.state
			payload.event = 'single'

			this.$root.mqttSend(payload)
		},


		/**
		 * @description Send colour event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		buttonColour()
		{
			let payload = {};
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = 'colorPicker'
			payload.state = {'colorRgb': {r: this.tile.colorRgb.r, g: this.tile.colorRgb.g, b: this.tile.colorRgb.b}}
			payload.event = 'change'

			this.$root.mqttSend(payload)
		},


		/**
		 * @description Set RGB from colour puck position
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Event} event
		 * @returns {void}
		 */
		setColour(event)
		{
			// Get mouse X/Y
			this.vect2.x = (event.clientX || event.touches[0].clientX) - this.$refs.wheelheight.getBoundingClientRect().left
			this.vect2.y = (event.clientY || event.touches[0].clientY) - this.$refs.wheelheight.getBoundingClientRect().top

			// Minus radius of colour wheel
			this.vect2.sub(this.vect1)

			// Cap to edge of colour wheel
			if (this.vect2.len() > this.$refs.wheelheight.clientWidth / 2)
			{
				this.vect2.setLength(this.$refs.wheelheight.clientWidth / 2)
			}

			// Calc HSB from puck position
			this.colour = Colour.vect2hsb(this.vect2, this.$refs.wheelheight.clientWidth / 2, this.colour.b)

			// Convert to RGB
			this.tile.colorRgb = Colour.hsb2rgb(this.colour.h, this.colour.s, this.colour.b)
			this.sliderColour = Colour.hsb2rgb(this.colour.h, this.colour.s, 100)

			// Re-add radius of colour wheel
			this.vect2.add(this.vect1)

			// Render position of colour puck
			this.$refs.colourPuck.style.left = `${this.vect2.x - (this.$refs.colourPuck.clientWidth / 2)}px`
			this.$refs.colourPuck.style.top = `${this.vect2.y - (this.$refs.colourPuck.clientHeight / 2)}px`

			// Render position of brightness puck
			this.$refs.brightnessPuck.style.left = `calc(${this.colour.b}% - ${this.$refs.brightnessPuck.clientWidth}px)`
		},


		/**
		 * @description Set RGB from brightness puck position
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Event} event
		 * @returns {void}
		 */
		setBrightness(event)
		{
			// Get X position
			let x = (event.clientX || event.touches[0].clientX) - this.$refs.brightnessWidth.getBoundingClientRect().left

			// Get as percent
			this.colour.b = Utils.clamp(Math.round(x / this.$refs.brightnessWidth.clientWidth * 100), 0, 100)

			// Convert to RGB
			this.tile.colorRgb = Colour.hsb2rgb(this.colour.h, this.colour.s, this.colour.b)

			// Render position of brightness puck
			let pixels = this.$refs.brightnessPuck.clientWidth * (this.colour.b / 100)
			this.$refs.brightnessPuck.style.left = `calc(${this.colour.b}% - ${pixels}px)`
		},


		/**
		 * @description Window resize handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		resizeHandler()
		{
			// Hack for older browsers
			this.wheel_height = this.$refs.wheelheight.clientWidth
			this.footer_width = this.$refs.footerIconWidth.clientHeight * 0.7

			// Radius of colour wheel
			this.vect1.x = this.$refs.wheelheight.clientWidth / 2
			this.vect1.y = this.$refs.wheelheight.clientHeight / 2

			// Calc HSB from RGB
			this.colour = Colour.rgb2hsb(this.tile.colorRgb.r, this.tile.colorRgb.g, this.tile.colorRgb.b)
			this.sliderColour = Colour.hsb2rgb(this.colour.h, this.colour.s, 100)

			// Get X,Y of HSB
			this.vect2 = Colour.hsb2vect(this.colour.h, this.colour.s, this.vect2, this.$refs.wheelheight.clientHeight / 2)

			// Add radius to X,Y
			this.vect2.add(this.vect1)

			// Render position of colour puck
			this.$refs.colourPuck.style.left = `${this.vect2.x - (this.$refs.colourPuck.clientWidth / 2)}px`
			this.$refs.colourPuck.style.top = `${this.vect2.y - (this.$refs.colourPuck.clientHeight / 2)}px`

			// Render position of brightness puck
			let pixels = this.$refs.brightnessPuck.clientWidth * (this.colour.b / 100)
			this.$refs.brightnessPuck.style.left = `calc(${this.colour.b}% - ${pixels}px)`
		},
	},


	/**
	 * @description On load
	 * @returns {void}
	 */
	mounted()
	{
		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},


	/**
	 * @description Called when view is unloaded
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {void}
	 */
	unmounted()
	{
		window.removeEventListener("resize", this.resizeHandler)
	},
}
</script>

<template>
	<header bp="grid 4" :style="cssVars">
		<button class="icon icon--before icon-_rgb"></button>
		<h2>{{ tile.label }}</h2>
		<button class="icon icon--before icon-_cct"></button>
	</header>

	<main bp="container" :style="cssVars">

		<div class="header-pad">&nbsp;<!-- compensates for fixed header --></div>

		<div class="colour-picker"
				@mousedown.prevent="mouseDown('colour')"
				@mouseleave.prevent="mouseUp('colour')"
				@mouseup.prevent="mouseUp('colour')"
				@touchstart.prevent="mouseDown('colour')"
				@touchend.prevent="mouseUp('colour')">
			<div class="colour-wheel" ref="wheelheight">
				<div class="rainbow"></div>
				<div class="white"></div>
			</div>
			<div class="puck" ref="colourPuck"></div>
		</div>

		<div class="brightness-slider" ref="brightnessWidth"
				@mousedown.prevent="mouseDown('brightness')"
				@mouseleave.prevent="mouseUp('brightness')"
				@mouseup.prevent="mouseUp('brightness')"
				@touchstart.prevent="mouseDown('brightness')"
				@touchend.prevent="mouseUp('brightness')">
			<div class="puck" ref="brightnessPuck"></div>
		</div>

		<div class="footer-pad">&nbsp;<!-- compensates for fixed footer --></div>
	</main>

	<footer bp="grid 4" :style="cssVars">
		<button class="icon icon--before icon-_left" @click="mouseDown('back')" ref="footerIconWidth"></button>
		<h2>&nbsp;</h2>
		<button :class="`icon icon--before icon-${tile.icon}`" @click="mouseDown('state')"></button>
	</footer>

</template>

<style scoped>
.colour-picker .puck,
.brightness-slider .puck
{
	background-color: var(--puck-colour);
}
.brightness-slider
{
	background-color: var(--slider-colour);
}
</style>
