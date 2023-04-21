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
			footer_width: null,
			items: null,
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
			}
		}
	},



	methods:
	{
		/**
		 * @description Mouse down event handler
		 * @memberof ControlsPickerRgb
		 * @param {String} cmd `back|{int}`
		 * @return {void}
		 */
		mouseDown(cmd)
		{
			switch (cmd)
			{
				case 'back':
					this.$root.navigateToUrl(`/screen/${this.tile.screen}`)
					break

				default:
					let payload = {};
					payload.screen = this.tile.screen
					payload.tile = this.tile.id
					payload.style = this.tile.style
					payload.type = this.tile.style
					payload.state = cmd
					payload.event = 'selection'

					this.$root.mqttSend(payload)
					this.tile.dropDownSelect = cmd
			}
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
		}
	},



	/**
	 * @description Called when view is loaded
	 * @memberof ControlsDropDown
	 * @returns {void}
	 */
	mounted()
	{
		this.items = this.tile.dropDownList

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
			<button class="circle">1</button>
			<button class="circle">2</button>
			<button class="circle">3</button>
			<button class="circle">4</button>
			<button class="circle">5</button>
			<button class="circle">6</button>
			<button class="circle">7</button>
			<button class="circle">8</button>
			<button class="circle">9</button>
			<button class="circle icon icon--before icon-_backspace notext">Back</button>
			<button class="circle">0</button>
			<button class="circle icon icon--before icon-_right notext">Confirm</button>
		</div>

		<div class="footer-pad">&nbsp;<!-- compensates for fixed footer --></div>
	</main>

	<footer bp="grid 4" :style="cssVars">
		<button class="icon icon--before icon-_left notext" @click="mouseDown('back')" ref="footerIconWidth">Back</button>
	</footer>
</template>

<style scoped>

</style>
