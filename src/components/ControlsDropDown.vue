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

	<main bp="container" :style="cssVars">

		<div bp="text-center">
			<h2 class="logo-before">{{ tile.label }}</h2>
		</div>

		<ul>
			<template v-for="(item, index) in items" :key="index">
			<li>
				<button @click="mouseDown(index + 1)" :class="tile.dropDownSelect == (index + 1)  ? 'active' : ''">{{ item }}</button>
			</li>
			</template>
		</ul>


		<div class="footer-pad">&nbsp;<!-- compensates for fixed footer --></div>
	</main>

	<footer bp="grid 4" :style="cssVars">
		<button class="icon icon--before icon-_left" @click="mouseDown('back')" ref="footerIconWidth">Back</button>
	</footer>
</template>

<style scoped>
h2
{
	margin-bottom: 3rem;
	font-size: 2em;
	color: #fff;
}
h2:before
{
	background-repeat: no-repeat;
	background-size: cover;
	display: inline-block;
	margin-right: 1.5rem;
	content: "";
	width: 2em;
	height: 2em;
	vertical-align: middle;
}

ul li
{
	list-style-type: none;
}
ul li:first-child button
{
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
}
ul li:last-child button
{
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
}

li button
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	padding: 1rem;
	width: 100%;
	display: block;
	overflow: hidden;
	position: relative;
	text-align: center;
	font-size: 2rem;
	color: #fff;
}
li button:hover,
li button:active,
li button:focus
{
	background-color: rgba(255,255,255,1);
	color: #000;
}
</style>
