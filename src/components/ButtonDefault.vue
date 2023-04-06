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
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
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


	/**
	 * @description Add/Remove window resize event handler
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {void}
	 */
	created()
	{
		window.addEventListener("resize", this.resizeHandler);
	},


	/**
	 * @description Add/Remove window resize event handler
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {void}
	 */
	destroyed()
	{
		window.removeEventListener("resize", this.resizeHandler);
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
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
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
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
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
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
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
		 * @description Send press event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		press()
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
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
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
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
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
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {void}
	 */
	mounted()
	{
		this.resizeHandler()
	},
}
</script>

<template>
<div bp="grid vertical-start" :class="`tile state-${tile.state} button-${tile.type} enabled-${tile.enabled} ${animation}`" v-bind:id="tile.id" :style="cssVars" ref="tileheight">

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
		<button @mousedown="mouseDown"
			@mouseup="mouseUp"
			@mouseout="mouseUp"
			@touchstart.prevent="mouseDown"
			@touchend.prevent="mouseUp"
			v-bind:disabled="!tile.enabled"></button>
	</div>

</div>
</template>

<style scoped>
.tile.state-on .icon
{
	background-color: var(--icon-color);
}
.buttons button:nth-child(1)
{
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
