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
	 * @memberof ControlsRemote
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
				button: null,
			},
		}
	},



	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof ControlsRemote
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
		 * @memberof ControlsRemote
		 * @param {String} type `back|home|left|right|up|down|ok|info|menu|cancel|button`
		 * @return {void}
		 */
		mouseDown(type)
		{
			switch (type)
			{
				case 'back':
					this.$root.navigateToUrl(`/screen/${this.tile.screen}`)
					break

				default:
					this.animations[type] = 'press-animation'
					this.timer = setInterval(this.mouseHold, this.interval, type)
					break
			}
		},


		/**
		 * @description Mouse up event handler
		 * @memberof ControlsRemote
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel|button`
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
		 * @memberof ControlsRemote
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel|button`
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
		 * @memberof ControlsRemote
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel|button`
		 * @return {void}
		 */
		mouseHold(type)
		{
			this.interval = 200
			this.hold(type)

			if (type != 'button') return

			// Only fire `hold` event once
			clearInterval(this.timer)
			this.timer = null
			this.interval = 500
			this.animations[type] = 'bounce-animation'
		},


		/**
		 * @description Send hold event from Tile
		 * @memberof ControlsRemote
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel|button`
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
		 * @memberof ControlsRemote
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
	 * @memberof ControlsRemote
	 * @returns {void}
	 */
	mounted()
	{
		this.$root.setAppCss({'gridTemplateRows': '4em auto 4em'})

		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},



	/**
	 * @description Called when view is unloaded
	 * @memberof ControlsRemote
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

	<main :style="cssVars">

		<div bp="grid 4" class="buttons-container">
			<button :class="`circle icon icon--before icon-_home notext ${animations.home}`"
				@mousedown="mouseDown('home')"
				@mouseleave="mouseUp('home')"
				@mouseup="mouseUp('home')"
				@touchstart="mouseDown('home')"
				@touchend.prevent="mouseUp('home')"
				ref="home">Home</button>

			<button :class="`circle icon icon--before icon-_up notext ${animations.up}`"
				@mousedown="mouseDown('up')"
				@mouseleave="mouseUp('up')"
				@mouseup="mouseUp('up')"
				@touchstart="mouseDown('up')"
				@touchend.prevent="mouseUp('up')"
				ref="up">Up</button>

			<button :class="`circle icon icon--before icon-_info notext ${animations.info}`"
				@mousedown="mouseDown('info')"
				@mouseleave="mouseUp('info')"
				@mouseup="mouseUp('info')"
				@touchstart="mouseDown('info')"
				@touchend.prevent="mouseUp('info')"
				ref="info">Info</button>

			<button :class="`circle icon icon--before icon-_left notext ${animations.left}`"
				@mousedown="mouseDown('left')"
				@mouseleave="mouseUp('left')"
				@mouseup="mouseUp('left')"
				@touchstart="mouseDown('left')"
				@touchend.prevent="mouseUp('left')"
				ref="left">Left</button>

			<button :class="`circle ${animations.ok}`"
				@mousedown="mouseDown('ok')"
				@mouseleave="mouseUp('ok')"
				@mouseup="mouseUp('ok')"
				@touchstart="mouseDown('ok')"
				@touchend.prevent="mouseUp('ok')"
				ref="ok">OK</button>

			<button :class="`circle icon icon--before icon-_right notext ${animations.right}`"
				@mousedown="mouseDown('right')"
				@mouseleave="mouseUp('right')"
				@mouseup="mouseUp('right')"
				@touchstart="mouseDown('right')"
				@touchend.prevent="mouseUp('right')"
				ref="right">Right</button>

			<button :class="`circle icon icon--before icon-_backspace notext ${animations.cancel}`"
				@mousedown="mouseDown('cancel')"
				@mouseleave="mouseUp('cancel')"
				@mouseup="mouseUp('cancel')"
				@touchstart="mouseDown('cancel')"
				@touchend.prevent="mouseUp('cancel')"
				ref="cancel">Cancel</button>

			<button :class="`circle icon icon--before icon-_down notext ${animations.down}`"
				@mousedown="mouseDown('down')"
				@mouseleave="mouseUp('down')"
				@mouseup="mouseUp('down')"
				@touchstart="mouseDown('down')"
				@touchend.prevent="mouseUp('down')"
				ref="down">Down</button>

			<button :class="`circle icon icon--before icon-_settings notext ${animations.list}`"
				@mousedown="mouseDown('list')"
				@mouseleave="mouseUp('list')"
				@mouseup="mouseUp('list')"
				@touchstart="mouseDown('list')"
				@touchend.prevent="mouseUp('list')"
				ref="list">List</button>
		</div>

	</main>

	<footer :style="cssVars">
		<button
			class="icon icon--before icon-_left notext"
			@click="mouseDown('back')"
			ref="footerIconWidth">Back</button>
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
header
{
	grid-template-columns: auto;
}
main
{
	margin: auto 0;
}
.buttons-container
{
	margin: 0 auto;
	padding: 1em;
	max-width: 1000px;
}
</style>
