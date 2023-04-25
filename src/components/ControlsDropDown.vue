<script setup>
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
	 * @description Prep data ready for populating
	 * @memberof ControlsDropDown
	 * @return {Object}
	 */
	data()
	{
		return {
			timer: null,
			interval: 500,
			footer_width: null,
			items: null,
			animations: {
				button: null,
			}
		}
	},



	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof ControlsDropDown
		 * @return {Object}
		 */
		cssVars()
		{
			return {
				'--footer-icon-width': `${this.footer_width}px`,
			}
		}
	},



	methods:
	{
		/**
		 * @description Mouse down event handler
		 * @memberof ControlsDropDown
		 * @param {String} type `back|button|{int}`
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
					this.animations[type] = 'press-animation'
					this.timer = setInterval(this.mouseHold, this.interval, type)
					break

				default:
					let payload = {};
					payload.screen = this.tile.screen
					payload.tile = this.tile.id
					payload.style = this.tile.style
					payload.type = this.tile.style
					payload.state = type
					payload.event = 'selection'

					this.$root.mqttSend(payload)
					this.tile.dropDownSelect = type

					this.$root.navigateToUrl(`/screen/${this.tile.screen}`)
					break
			}
		},



		/**
		 * @description Mouse up event handler
		 * @memberof ControlsDropDown
		 * @param {String} type `button`
		 * @return {void}
		 */
		mouseUp(type)
		{
			if (!this.timer) return

			clearInterval(this.timer)
			this.timer = null

			if (this.interval == 500)
			{
				this.press(type)
			}
			else
			{
				this.interval = 500
			}

			this.animations[type] = 'bounce-animation'
		},


		/**
		 * @description Mouse hold event handler
		 * @memberof ControlsDropDown
		 * @param {String} type `button`
		 * @return {void}
		 */
		mouseHold(type)
		{
			this.interval = 200
			this.hold(type)

			// Only fire `hold` event once
			clearInterval(this.timer)
			this.timer = null
			this.interval = 500
			this.animations[type] = 'bounce-animation'
		},


		/**
		 * @description Send press event from Tile
		 * @memberof ControlsDropDown
		 * @param {String} type `button`
		 * @return {void}
		 */
		press(type)
		{
			let payload = {}
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = type
			payload.event = 'single'

			this.$root.mqttSend(payload)
		},


		/**
		 * @description Send hold event from Tile
		 * @memberof ControlsDropDown
		 * @param {String} type `button`
		 * @return {void}
		 */
		hold(type)
		{
			let payload = {}
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = type
			payload.event = 'hold'

			this.$root.mqttSend(payload)
		},


		/**
		 * @description Window resize handler
		 * @memberof ControlsDropDown
		 * @return {void}
		 */
		resizeHandler()
		{
			// Hack for older browsers
			this.footer_width = this.$refs.footerIconWidth.clientHeight * 0.7
		}
	},



	/**
	 * @description Called when view is loaded
	 * @memberof ControlsDropDown
	 * @returns {void}
	 */
	mounted()
	{
		this.$root.setAppCss({'gridTemplateRows': '4em calc(100vh - var(--footer-height-both)) 4em'})
		this.items = this.tile.dropDownList

		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},



	/**
	 * @description Called when view is unloaded
	 * @memberof ControlsDropDown
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
		<h1 :class="`icon icon--before icon-${tile.icon}`">{{ tile.label }}</h1>
	</header>

	<main :style="cssVars" bp="container">

		<ul>
			<template v-for="(item, index) in items" :key="index">
			<li>
				<button @click="mouseDown(index + 1)" :class="tile.dropDownSelect == (index + 1)  ? 'active' : ''">{{ item }}</button>
			</li>
			</template>
		</ul>

	</main>

	<footer :style="cssVars">
		<button
			class="icon icon--before icon-_left notext"
			@click="mouseDown('back')"
			ref="footerIconWidth">Back</button>
		<div>&nbsp;</div>
		<button
			:class="`icon icon--before icon-_onoff notext ${animations.button}`"
			@mousedown="mouseDown('button')"
			@mouseleave="mouseUp('button')"
			@mouseup="mouseUp('button')"
			@touchstart="mouseDown('button')"
			@touchend.prevent="mouseUp('button')"
			v-bind:disabled="!tile.enabled"></button>
	</footer>
</template>

<style scoped>
header
{
	grid-template-columns: auto;
}
main
{
	padding: 1em;
	overflow-y: scroll
}
</style>
