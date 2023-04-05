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
	 * @description Prep timestamp ready for hold events
	 * @return {Object}
	 */
	data()
	{
		return {
			tile_height: null,
			icon_height: null,
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
		 * @description Mouse click event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		press()
		{
			if (!this.tile.enabled) return

			this.$root.navigateToScreen(this.tile.link)
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
<div bp="grid vertical-start" :class="`tile state-${tile.state} button-${tile.type} enabled-${tile.enabled}`" v-bind:id="tile.id" :style="cssVars" ref="tileheight">
	<div class="image"></div>
	<div bp="4" :class="`icon icon--mask icon-${tile.icon}`" ref="iconheight"></div>
	<div bp="12" class="label">
		{{ tile.label }}
		<template v-if="tile.subLabel">
			<br><span>{{ tile.subLabel }}</span>
		</template>
	</div>
	<div class="buttons">
		<button @click="press" class="icon--mask icon-_right" v-bind:disabled="!tile.enabled"></button>
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
	background-color: #fff;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	-webkit-mask-size: 20%;
	mask-size: 20%;
	-webkit-mask-position: 100% 50%;
    mask-position:  100% 50%;
}
.tile.enabled-false button
{
	background-color: rgba(0,0,0,0.3) !important;
}
</style>
