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
	 * @memberof ControlsKeyPad
	 * @return {Object}
	 */
	data()
	{
		return {
			footer_width: null,
			timer: null,
			interval: 500,
			items: null,
			animations: {
				btn1: null,
				btn2: null,
				btn3: null,
				btn4: null,
				btn5: null,
				btn6: null,
				btn7: null,
				btn8: null,
				btn9: null,
				btn0: null,
				delete: null,
				ok: null,
			},
		}
	},



	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof ControlsKeyPad
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
		 * @memberof ControlsKeyPad
		 * @param {String} type `btn1|btn2|btn3|btn4|btn5|btn6|btn7|btn8|btn9|btn0|delete|ok`
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
		 * @memberof ControlsKeyPad
		 * @param {String} type `btn1|btn2|btn3|btn4|btn5|btn6|btn7|btn8|btn9|btn0|delete|ok`
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
		 * @memberof ControlsKeyPad
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel|button`
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
		 * @memberof ControlsKeyPad
		 * @param {String} type `btn1|btn2|btn3|btn4|btn5|btn6|btn7|btn8|btn9|btn0|delete|ok`
		 * @return {void}
		 */
		press(type)
		{

		},


		/**
		 * @description Send hold event from Tile
		 * @memberof ControlsKeyPad
		 * @param {String} type `home|left|right|up|down|ok|info|menu|cancel|button`
		 * @return {void}
		 */
		hold(type)
		{

		},


		/**
		 * @description Window resize handler
		 * @memberof ControlsKeyPad
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
	 * @memberof ControlsKeyPad
	 * @returns {void}
	 */
	mounted()
	{
		this.$root.setAppCss({"gridTemplateRows": "4em auto 4em"})
		this.items = this.tile.dropDownList

		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},



	/**
	 * @description Called when view is unloaded
	 * @memberof ControlsKeyPad
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
			<button
				class="circle"
				@mousedown="mouseDown('btn1')"
				@mouseleave="mouseUp('btn1')"
				@mouseup="mouseUp('btn1')"
				@touchstart="mouseDown('btn1')"
				@touchend.prevent="mouseUp('btn1')">1</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn2')"
				@mouseleave="mouseUp('btn2')"
				@mouseup="mouseUp('btn2')"
				@touchstart="mouseDown('btn2')"
				@touchend.prevent="mouseUp('btn2')">2</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn3')"
				@mouseleave="mouseUp('btn3')"
				@mouseup="mouseUp('btn3')"
				@touchstart="mouseDown('btn3')"
				@touchend.prevent="mouseUp('btn3')">3</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn4')"
				@mouseleave="mouseUp('btn4')"
				@mouseup="mouseUp('btn4')"
				@touchstart="mouseDown('btn4')"
				@touchend.prevent="mouseUp('btn4')">4</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn5')"
				@mouseleave="mouseUp('btn5')"
				@mouseup="mouseUp('btn5')"
				@touchstart="mouseDown('btn5')"
				@touchend.prevent="mouseUp('btn5')">5</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn6')"
				@mouseleave="mouseUp('btn6')"
				@mouseup="mouseUp('btn6')"
				@touchstart="mouseDown('btn6')"
				@touchend.prevent="mouseUp('btn6')">6</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn7')"
				@mouseleave="mouseUp('btn7')"
				@mouseup="mouseUp('btn7')"
				@touchstart="mouseDown('btn7')"
				@touchend.prevent="mouseUp('btn7')">7</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn8')"
				@mouseleave="mouseUp('btn8')"
				@mouseup="mouseUp('btn8')"
				@touchstart="mouseDown('btn8')"
				@touchend.prevent="mouseUp('btn8')">8</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn9')"
				@mouseleave="mouseUp('btn9')"
				@mouseup="mouseUp('btn9')"
				@touchstart="mouseDown('btn9')"
				@touchend.prevent="mouseUp('btn9')">9</button>
			<button
				class="circle icon icon--before icon-_backspace notext"
				@mousedown="mouseDown('delete')"
				@mouseleave="mouseUp('delete')"
				@mouseup="mouseUp('delete')"
				@touchstart="mouseDown('delete')"
				@touchend.prevent="mouseUp('delete')">Delete</button>
			<button
				class="circle"
				@mousedown="mouseDown('btn0')"
				@mouseleave="mouseUp('btn0')"
				@mouseup="mouseUp('btn0')"
				@touchstart="mouseDown('btn0')"
				@touchend.prevent="mouseUp('btn0')">0</button>
			<button
				class="circle icon icon--before icon-_right notext"
				@mousedown="mouseDown('ok')"
				@mouseleave="mouseUp('ok')"
				@mouseup="mouseUp('ok')"
				@touchstart="mouseDown('ok')"
				@touchend.prevent="mouseUp('ok')">OK</button>
		</div>

	</main>

	<footer :style="cssVars">
		<button
			class="icon icon--before icon-_left notext"
			@click="mouseDown('back')"
			ref="footerIconWidth">Back</button>
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
