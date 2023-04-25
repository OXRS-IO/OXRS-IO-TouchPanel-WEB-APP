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
	 * @description Prep timer ready for hold events
	 * @memberof ButtonKeyPad
	 * @return {Object}
	 */
	data()
	{
		return {
			timer: null,
			interval: 500,
			tile_height: null,
			icon_height: null,
			animation: null,
		}
	},


	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof ButtonKeyPad
		 * @return {Object}
		 */
		cssVars()
		{
			return {
				'--icon-color': `rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,
				'--tile-height': `${this.tile_height}px`,
				'--icon-height': `${this.icon_height}px`,
			}
		}
	},


	methods:
	{
		/**
		 * @description Mouse down event handler
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		mouseDown()
		{
			if (!this.tile.enabled) return

			this.animation = 'press-animation'
			this.timer = setInterval(this.mouseHold, this.interval)
		},


		/**
		 * @description Mouse up event handler
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		mouseUp()
		{
			if (!this.timer) return

			clearInterval(this.timer)
			this.timer = null

			if (this.interval == 500)
			{
				this.press()
			}
			else
			{
				this.interval = 500
			}

			this.animation = 'bounce-animation'
		},


		/**
		 * @description Mouse hold event handler
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		mouseHold()
		{
			this.hold()

			// Only fire `hold` event once
			clearInterval(this.timer)
			this.timer = null
			this.interval = 500
			this.animation = 'bounce-animation'
		},


		/**
		 * @description Mouse cancel event handler
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		mouseCancel()
		{
			clearInterval(this.timer)
			this.timer = null
			this.interval = 500
			this.animation = ''
		},


		/**
		 * @description Send press event from Tile
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		press()
		{
			this.$root.navigateToUrl(`/screen/${this.tile.screen}/tile/${this.tile.id}`)
		},


		/**
		 * @description Send hold event from Tile
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		hold()
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
		 * @description Window resize handler
		 * @memberof ButtonKeyPad
		 * @return {void}
		 */
		resizeHandler()
		{
			this.tile_height = this.$refs.tileheight.clientWidth
			this.icon_height = this.$refs.iconheight.clientWidth
		}
	},


	/**
	 * @description Called when view is ready
	 * @memberof ButtonKeyPad
	 * @return {void}
	 */
	mounted()
	{
		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},


	/**
	 * @description Called when view is unloaded
	 * @memberof ButtonKeyPad
	 * @return {void}
	 */
	unmounted()
	{
		window.removeEventListener("resize", this.resizeHandler)
	},
}
</script>

<template>
<div bp="grid vertical-start" :class="`tile state-${tile.state} button-${tile.style} enabled-${tile.enabled} ${animation}`" v-bind:id="tile.id" :style="cssVars" ref="tileheight">

	<div class="image"></div>

	<template v-if="tile.icon">
		<div bp="4" :class="`icon icon--mask icon-${tile.icon}`" ref="iconheight"></div>
	</template>

	<div bp="12" class="label">
		{{ tile.label }}
		<template v-if="tile.subLabel">
			<br><span>{{ tile.subLabel }}</span>
		</template>
	</div>

	<div class="buttons">
		<button class="icon--mask icon-_dots" @mousedown="mouseDown"
			@mouseup="mouseUp"
			@mouseout="mouseUp"
			@touchstart="mouseDown"
			@touchend.prevent="mouseUp"
			@touchmove="mouseCancel"
			v-bind:disabled="!tile.enabled"></button>
	</div>

</div>
</template>

<style scoped>
.buttons button
{
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-mask-size: 20%;
	mask-size: 20%;
	-webkit-mask-position: 100% 10%;
	mask-position: 100% 10%;
}
.tile.state-on .buttons button
{
	background-color: var(--icon-color);
}
.tile.enabled-false .buttons button
{
	background-color: rgba(0,0,0,0.3) !important;
}
</style>
