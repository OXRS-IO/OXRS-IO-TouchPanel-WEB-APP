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
		 * @param {String} type `button|up|down`
		 * @return {void}
		 */
		mouseDown(type)
		{
			if (!this.tile.enabled) return

			this.animation = 'press-animation'
			this.timer = setInterval(this.mouseHold, this.interval, type)
		},


		/**
		 * @description Mouse up event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `button|up|down`
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

			this.animation = 'bounce-animation'
		},


		/**
		 * @description Mouse hold event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `button|up|down`
		 * @return {void}
		 */
		mouseHold(type)
		{
			this.interval = 200
			this.hold(type)
		},


		/**
		 * @description Send press event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `button|up|down`
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

			switch (type)
			{
				case "button":
					payload.state = this.tile.state
					break;
			}

			this.$root.mqttSend(payload);
		},


		/**
		 * @description Send hold event from Tile
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} type `button|up|down`
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

			switch (type)
			{
				case "button":
					payload.state = this.tile.state
					break;
			}

			this.$root.mqttSend(payload);
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
		},
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
	<div bp="4" :class="`icon icon--mask icon-${tile.icon}`" ref="iconheight"></div>
	<div bp="12" class="label">
		{{ tile.label }}
		<template v-if="tile.subLabel">
			<br><span>{{ tile.subLabel }}</span>
		</template>
	</div>
	<div class="buttons">
		<button @mousedown="mouseDown('button')" @mouseup="mouseUp('button')" @mouseout="mouseUp('button')" @touchstart.prevent="mouseDown('button')" @touchend.prevent="mouseUp('button')" v-bind:disabled="!tile.enabled"></button>
		<button @mousedown="mouseDown('up')" @mouseup="mouseUp('up')" @mouseout="mouseUp('up')" @touchstart.prevent="mouseDown('up')" @touchend.prevent="mouseUp('up')" class="icon--mask icon-_up" v-bind:disabled="!tile.enabled"></button>
		<button @mousedown="mouseDown('down')" @mouseup="mouseUp('down')" @mouseout="mouseUp('down')" @touchstart.prevent="mouseDown('down')" @touchend.prevent="mouseUp('down')" class="icon--mask icon-_down" v-bind:disabled="!tile.enabled"></button>
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
	width: 50%;
	height: 100%;

}

.buttons button:nth-child(2)
{
	background-color: #fff;
	position: absolute;
	width: 50%;
	height: 50%;
	top: 0;
	right: 0;
	-webkit-mask-size: 50%;
	mask-size: 50%;
}

.buttons button:nth-child(3)
{
	background-color: #fff;
	position: absolute;
	width: 50%;
	height: 50%;
	bottom: 0;
	right: 0;
	-webkit-mask-size: 50%;
	mask-size: 50%;
}

.tile.state-on .buttons button:nth-child(2),
.tile.state-on .buttons button:nth-child(3)
{
	background-color: var(--icon-color);
}
.tile.enabled-false .buttons button:nth-child(2),
.tile.enabled-false .buttons button:nth-child(3)
{
	background-color: rgba(0,0,0,0.3) !important;
}
</style>
