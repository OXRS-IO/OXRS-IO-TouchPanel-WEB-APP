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
	 * @memberof ControlsPickerRgb
	 * @return {Object}
	 */
	data()
	{
		return {
			timer: null,
			interval: 500,
			wheel_width: null,
			wheel_height: null,
			footer_width: null,
			drag_event: null,
			vect1: new Vector(0,0),
			vect2: new Vector(0,0),
			colour: {h: 0, s: 0, b: 100},
			sliderColour: {r: 255, g: 255, b: 255},
			animations: {
				button: null
			},
		}
	},



	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof ControlsPickerRgb
		 * @return {Object}
		 */
		cssVars()
		{
			return {
				'--wheel-height': `${this.wheel_height}px`,
				'--wheel-width': `${this.wheel_width}px`,
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
		 * @memberof ControlsPickerRgb
		 * @param {String} type `back|state`
		 * @return {void}
		 */
		mouseDown(type)
		{
			switch (type)
			{
				case 'back':
					this.$root.navigateToUrl(`/screen/${this.tile.screen}`)
					break

				case 'button':
					if (!this.tile.enabled) return

					this.animations.button = 'press-animation'
					this.timer = setInterval(this.mouseHold, this.interval)
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
		 * @memberof ControlsPickerRgb
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

				case 'button':
					if (!this.timer) return

					clearInterval(this.timer)
					this.timer = null

					if (this.interval == 500)
					{
						this.buttonPress()
					}
					else
					{
						this.interval = 500
					}

					this.animations.button = 'bounce-animation'
					break
			}
		},



		/**
		 * @description Colour picker mouse move
		 * @memberof ControlsPickerRgb
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
		 * @description Mouse hold event handler
		 * @memberof ControlsPickerRgb
		 * @return {void}
		 */
		mouseHold()
		{
			this.buttonHold()

			// Only fire `hold` event once
			clearInterval(this.timer)
			this.timer = null
			this.interval = 500
			this.animations.button = 'bounce-animation'
		},


		/**
		 * @description Send press event from Tile
		 * @memberof ControlsPickerRgb
		 * @return {void}
		 */
		buttonPress()
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
		 * @description Send hold event from Tile
		 * @memberof ControlsPickerRgb
		 * @return {void}
		 */
		buttonHold()
		{
			let payload = {};
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = 'button'
			payload.state = this.tile.state
			payload.event = 'hold'

			this.$root.mqttSend(payload)
		},


		/**
		 * @description Send colour event from Tile
		 * @memberof ControlsPickerRgb
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
		 * @memberof ControlsPickerRgb
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

			// Calc colour puck offset. Reference is top-left of puck
			let offset = new Vector(
				(this.vect2.x / this.$refs.wheelheight.clientWidth) * 100,
				(this.vect2.y / this.$refs.wheelheight.clientHeight) * 100,
			)

			// Render position of colour puck
			this.$refs.colourPuck.style.left = `${this.vect2.x - (this.$refs.colourPuck.offsetWidth * (offset.x / 100))}px`
			this.$refs.colourPuck.style.top = `${this.vect2.y - (this.$refs.colourPuck.offsetHeight * (offset.y / 100))}px`

			// Calc brightness puck offset. Reference is top-left of puck
			offset = this.$refs.brightnessPuck.offsetWidth * (this.colour.b / 100)

			// Render position of brightness puck
			this.$refs.brightnessPuck.style.left = `calc(${this.colour.b}% - ${offset}px)`
		},


		/**
		 * @description Set RGB from brightness puck position
		 * @memberof ControlsPickerRgb
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

			// Calc brightness puck offset. Reference is top-left of puck
			let offset = this.$refs.brightnessPuck.offsetWidth * (this.colour.b / 100)

			// Render position of brightness puck
			this.$refs.brightnessPuck.style.left = `calc(${this.colour.b}% - ${offset}px)`
		},


		/**
		 * @description Window resize handler
		 * @memberof ControlsPickerRgb
		 * @return {void}
		 */
		resizeHandler()
		{
			// Prioritise height of colour wheel
			this.$refs.wheelheight.style.width = 'auto'
			this.$refs.wheelheight.style.height = '100%'

			// Calc width, heights
			this.wheel_width = this.$refs.wheelheight.clientWidth
			this.wheel_height = this.$refs.wheelheight.clientHeight

			// Prioritise width of colour wheel when portrait screen ratio
			if (this.wheel_height > this.wheel_width)
			{
				this.$refs.wheelheight.style.width = '100%'
				this.$refs.wheelheight.style.height = 'auto'
			}

			// Hack for older browsers
			this.wheel_width = this.$refs.wheelheight.clientWidth
			this.wheel_height = this.$refs.wheelheight.clientHeight
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

			// Calc colour puck offset. Reference is top-left of puck
			let offset = new Vector(
				(this.vect2.x / this.$refs.wheelheight.clientWidth) * 100,
				(this.vect2.y / this.$refs.wheelheight.clientHeight) * 100,
			)

			// Render position of colour puck
			this.$refs.colourPuck.style.left = `${this.vect2.x - (this.$refs.colourPuck.offsetWidth * (offset.x / 100))}px`
			this.$refs.colourPuck.style.top = `${this.vect2.y - (this.$refs.colourPuck.offsetHeight * (offset.y / 100))}px`

			// Calc brightness puck offset. Reference is top-left of puck
			offset = this.$refs.brightnessPuck.offsetWidth * (this.colour.b / 100)

			// Render position of brightness puck
			this.$refs.brightnessPuck.style.left = `calc(${this.colour.b}% - ${offset}px)`
		},
	},


	/**
	 * @description On load
	 * @memberof ControlsPickerRgb
	 * @returns {void}
	 */
	mounted()
	{
		this.$root.setAppCss({"gridTemplateRows": "4em auto 4em"})

		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},


	/**
	 * @description Called when view is unloaded
	 * @memberof ControlsPickerRgb
	 * @return {void}
	 */
	unmounted()
	{
		window.removeEventListener("resize", this.resizeHandler)
	},
}
</script>

<template>
	<header :style="cssVars">
		<button class="icon icon--before icon-_rgb notext">Colour</button>
		<h1>{{ tile.label }}</h1>
		<button class="icon icon--before icon-_cct notext">Temperature</button>
	</header>

	<main :style="cssVars">

		<div class="colour-container"
			@mousedown="mouseDown('colour')"
			@mouseleave="mouseUp('colour')"
			@mouseup="mouseUp('colour')"
			@touchstart.prevent="mouseDown('colour')"
			@touchend.prevent="mouseUp('colour')"
			>
			<div class="colour-wheel" ref="wheelheight">
				<div class="puck" ref="colourPuck"></div>
			</div>

		</div>

		<div class="brightness-container"
			@mousedown="mouseDown('brightness')"
			@mouseleave="mouseUp('brightness')"
			@mouseup="mouseUp('brightness')"
			@touchstart.prevent="mouseDown('brightness')"
			@touchend.prevent="mouseUp('brightness')"
			>
			<div class="brightness-slider" ref="brightnessWidth">
				<div class="puck" ref="brightnessPuck"></div>
			</div>
		</div>

	</main>

	<footer :style="cssVars">
		<button
			class="icon icon--before icon-_left notext"
			@click="mouseDown('back')"
			ref="footerIconWidth"></button>
		<div>&nbsp;</div>
		<button
			:class="`icon icon--before icon-_onoff notext ${animations.button} state-${tile.state}`"
			@mousedown="mouseDown('button')"
			@mouseleave="mouseUp('button')"
			@mouseup="mouseUp('button')"
			@touchstart="mouseDown('button')"
			@touchend.prevent="mouseUp('button')"
			v-bind:disabled="!tile.enabled"></button>
	</footer>

</template>



<style scoped>
main
{
	display: grid;
	padding: 1em;
	grid-template-rows: 70% 30%;
}

.colour-wheel .puck,
.brightness-slider .puck
{
	background-color: var(--puck-colour);
}
.brightness-slider
{
	background-color: var(--slider-colour);
}
</style>
