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
			circle_width: null,
			animations: {
				home: null,
				left: null,
				up: null,
				down: null,
				right: null,
				info: null,
				cancel: null,
				menu: null,
			},
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
				'--circle-width': `${this.circle_width}px`,
			}
		}
	},



	methods:
	{
		/**
		 * @description Mouse down event handler
		 * @memberof ControlsPickerRgb
		 * @param {String} type `back|home|left|right|up|down|ok|info|menu|cancel`
		 * @return {void}
		 */
		mouseDown(type)
		{
			switch (type)
			{
				case 'back':
					this.$root.navigateToUrl(`/screen/${this.tile.screen}`)
					break

				case 'home':
				case 'info':
				case 'cancel':
				case 'list':
				case 'ok':
				case 'left':
				case 'up':
				case 'right':
				case 'down':
					this.animations[type] = 'press-animation'
					this.timer = setInterval(this.mouseHold, this.interval, type)
					break
			}
		},


		/**
		 * @description Mouse up event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel`
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
		 * @description Send press event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel`
		 * @return {void}
		 */
		press(type)
		{
			let payload = {}
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = type == 'cancel' ? 'back' : type
			payload.event = 'single'

			this.$root.mqttSend(payload)
		},


		/**
		 * @description Mouse hold event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel`
		 * @return {void}
		 */
		mouseHold(type)
		{
			this.interval = 200
			this.hold(type)
		},


		/**
		 * @description Send hold event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel`
		 * @return {void}
		 */
		hold(type)
		{
			let payload = {}
			payload.screen = this.tile.screen
			payload.tile = this.tile.id
			payload.style = this.tile.style
			payload.type = type == 'cancel' ? 'back' : type
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
			this.icon_width = this.$refs.home.clientHeight
		}
	},



	/**
	 * @description Called when view is loaded
	 * @memberof ControlsDropDown
	 * @returns {void}
	 */
	mounted()
	{
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
		<div bp="container">
			<h2 :class="`icon icon--before icon-${tile.icon}`">{{ tile.label }}</h2>
		</div>
	</header>

	<main bp="container" :style="cssVars" style="max-width: 500px">

		<div class="header-pad">&nbsp;<!-- compensates for fixed header --></div>

		<div bp="grid 4">
			<button :class="`circle icon icon--before icon-_home notext ${animations.home}`"
				@mousedown.prevent="mouseDown('home')"
				@mouseleave.prevent="mouseUp('home')"
				@mouseup.prevent="mouseUp('home')"
				@touchstart.prevent="mouseDown('home')"
				@touchend.prevent="mouseUp('home')" ref="home">Home</button>

			<button :class="`circle icon icon--before icon-_up notext ${animations.up}`"
				@mousedown.prevent="mouseDown('up')"
				@mouseleave.prevent="mouseUp('up')"
				@mouseup.prevent="mouseUp('up')"
				@touchstart.prevent="mouseDown('up')"
				@touchend.prevent="mouseUp('up')" ref="up">Up</button>

			<button :class="`circle icon icon--before icon-_info notext ${animations.info}`"
				@mousedown.prevent="mouseDown('info')"
				@mouseleave.prevent="mouseUp('info')"
				@mouseup.prevent="mouseUp('info')"
				@touchstart.prevent="mouseDown('info')"
				@touchend.prevent="mouseUp('info')" ref="info">Info</button>

			<button :class="`circle icon icon--before icon-_left notext ${animations.left}`"
				@mousedown.prevent="mouseDown('left')"
				@mouseleave.prevent="mouseUp('left')"
				@mouseup.prevent="mouseUp('left')"
				@touchstart.prevent="mouseDown('left')"
				@touchend.prevent="mouseUp('left')" ref="left">Left</button>

			<button :class="`circle ${animations.ok}`"
				@mousedown.prevent="mouseDown('ok')"
				@mouseleave.prevent="mouseUp('ok')"
				@mouseup.prevent="mouseUp('ok')"
				@touchstart.prevent="mouseDown('ok')"
				@touchend.prevent="mouseUp('ok')" ref="ok">OK</button>

			<button :class="`circle icon icon--before icon-_right notext ${animations.right}`"
				@mousedown.prevent="mouseDown('right')"
				@mouseleave.prevent="mouseUp('right')"
				@mouseup.prevent="mouseUp('right')"
				@touchstart.prevent="mouseDown('right')"
				@touchend.prevent="mouseUp('right')" ref="right">Right</button>

			<button :class="`circle icon icon--before icon-_backspace notext ${animations.cancel}`"
				@mousedown.prevent="mouseDown('cancel')"
				@mouseleave.prevent="mouseUp('cancel')"
				@mouseup.prevent="mouseUp('cancel')"
				@touchstart.prevent="mouseDown('cancel')"
				@touchend.prevent="mouseUp('cancel')" ref="cancel">Cancel</button>

			<button :class="`circle icon icon--before icon-_down notext ${animations.down}`"
				@mousedown.prevent="mouseDown('down')"
				@mouseleave.prevent="mouseUp('down')"
				@mouseup.prevent="mouseUp('down')"
				@touchstart.prevent="mouseDown('down')"
				@touchend.prevent="mouseUp('down')" ref="down">Down</button>

			<button :class="`circle icon icon--before icon-_settings notext ${animations.list}`"
				@mousedown.prevent="mouseDown('list')"
				@mouseleave.prevent="mouseUp('list')"
				@mouseup.prevent="mouseUp('list')"
				@touchstart.prevent="mouseDown('list')"
				@touchend.prevent="mouseUp('list')" ref="list">List</button>
		</div>

		<div class="footer-pad">&nbsp;<!-- compensates for fixed footer --></div>
	</main>

	<footer bp="grid 4" :style="cssVars">
		<button class="icon icon--before icon-_left notext" @click="mouseDown('back')" ref="footerIconWidth">Back</button>
	</footer>
</template>

<style scoped>

</style>
