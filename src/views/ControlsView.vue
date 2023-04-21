<script setup>
import ControlsPickerRgb from '@/components/ControlsPickerRgb.vue'
import ControlsDropDown from '@/components/ControlsDropDown.vue';
import ControlsKeyPad from '@/components/ControlsKeyPad.vue';
import ControlsRemote from '@/components/ControlsRemote.vue';
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

		this.$root.setBgColour({r: 0, g: 0, b: 0})
	},
}
</script>

<template v-if="tile">
	<ControlsPickerRgb v-if="tile.style == 'colorPickerRgb'" :tile="tile"></ControlsPickerRgb>
	<ControlsDropDown v-if="tile.style == 'dropDown'" :tile="tile"></ControlsDropDown>
	<ControlsKeyPad v-if="tile.style == 'keyPad'" :tile="tile"></ControlsKeyPad>
	<ControlsRemote v-if="tile.style == 'remote'" :tile="tile"></ControlsRemote>
</template>
