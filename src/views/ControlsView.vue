<script setup>
import ControlsPickerRgb from '@/components/ControlsPickerRgb.vue'
</script>

<script>
export default
{
	/**
	 * @description Prep data for populating
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {Object}
	 */
	data()
	{
		return {
			tile: {style: null},
			screen: null,
		}
	},


	/**
	 * @description On load fetch the correct controls component
	 * @returns {void}
	 */
	mounted()
	{
		this.screen = this.$root.getScreen(this.$route.params.screen)
		this.tile = this.screen.getTile(this.$route.params.tile)

		document.querySelector('body').setAttribute('style', `background-color: rgb(0, 0, 0)`)
	},
}
</script>

<template v-if="tile">
	<ControlsPickerRgb v-if="tile.style == 'colorPickerRgb'" :tile="tile"></ControlsPickerRgb>
</template>
