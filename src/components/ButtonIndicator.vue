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
	 * @memberof ButtonIndicator
	 * @return {Object}
	 */
	data()
	{
		return {
			tile_height: null,
		}
	},


	computed:
	{
		/**
		 * @description Populate CSS variables from computed values
		 * @memberof ButtonIndicator
		 * @return {Object}
		 */
		cssVars()
		{
			return {
				'--icon-color': `rgb(${this.tile.iconColorRgb.r},${this.tile.iconColorRgb.g},${this.tile.iconColorRgb.b})`,
				'--tile-height': `${this.tile_height}px`,
			}
		}
	},


	methods:
	{
		/**
		 * @description Window resize handler
		 * @memberof ButtonIndicator
		 * @return {void}
		 */
		resizeHandler()
		{
			this.tile_height = this.$refs.tileheight.clientWidth
		},
	},


	/**
	 * @description Called when view is ready
	 * @memberof ButtonIndicator
	 * @return {void}
	 */
	mounted()
	{
		window.addEventListener("resize", this.resizeHandler)
		this.resizeHandler()
	},


	/**
	 * @description Called when view is unloaded
	 * @memberof ButtonIndicator
	 * @return {void}
	 */
	 unmounted()
	{
		window.removeEventListener("resize", this.resizeHandler)
	},
}
</script>


<template>
<div bp="grid vertical-start" :class="`tile state-${tile.state} button-${tile.style} enabled-${tile.enabled} ${animation}`" v-bind:id="tile.id" ref="tileheight">

	<div class="image"></div>

	<div bp="12" class="indicator">
		<h1>{{ tile.value }}<sup>{{ tile.units }}</sup></h1>
		<h2>{{ tile.subValue }}<sup>{{ tile.subUnits }}</sup></h2>
	</div>

	<div bp="12" class="label">
		{{ tile.label }}
		<template v-if="tile.subLabel">
			<br><span>{{ tile.subLabel }}</span>
		</template>
	</div>

</div>
</template>


<style scoped>
.tile .indicator h1,
.tile .indicator h2
{
	margin-bottom: 0;
	color: var(--icon-color);
}
.tile .indicator sup
{
	font-size: 0.6em;
}
@media (min-width:720px)
{
	.tile .indicator h1
	{
		font-size: 1.5em;
	}
	.tile .indicator h2
	{
		font-size: 1em;
	}
}
@media (min-width:960px)
{
	.tile .indicator h1
	{
		font-size: 2.5em;
	}
	.tile .indicator h2
	{
		font-size: 1.5em;
	}
}
@media (min-width:1440px)
{
	.tile .indicator h1
	{
		font-size: 3em;
	}
	.tile .indicator h2
	{
		font-size: 2.5em;
	}
}
</style>
