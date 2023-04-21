<script setup>
import ButtonDefault from '@/components/ButtonDefault.vue'
import ButtonUpDown from '@/components/ButtonUpDown.vue'
import ButtonLevelDown from '@/components/ButtonLevelDown.vue'
import ButtonLevelUp from '@/components/ButtonLevelUp.vue'
import ButtonLeftRight from '@/components/ButtonLeftRight.vue'
import ButtonPrevNext from '@/components/ButtonPrevNext.vue'
import ButtonLink from '@/components/ButtonLink.vue'
import ButtonIndicator from '@/components/ButtonIndicator.vue'
import ButtonPickerRgb from '@/components/ButtonPickerRgb.vue'
import ButtonDropDown from '@/components/ButtonDropDown.vue'
import ButtonKeyPad from '@/components/ButtonKeyPad.vue'
import ButtonRemote from '@/components/ButtonRemote.vue'
</script>


<script>
export default
{
	/**
	 * @description Watch for navigation changes, and populate tiles accordingly
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {void}
	 */
	created()
	{
		this.$watch(
			() => this.$route.params,
			() =>
			{
				this.fetchTiles()
				this.updateScreen()
			},
			{
				immediate: true
			}
		)

		this.$watch(
			() => this.$root.screens[this.$route.params.screen],
			() =>
			{
				this.fetchTiles()
			},
			{
				immediate: true
			}
		)
	},


	/**
	 * @description Prep tiles list ready for populating
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {Object}
	 */
	data()
	{
		return {
			footer_width: null,
			tiles: [],
			screen: {
				footer: {
					left: '',
					center: '',
					right: ''
				},
			},
		}
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
				'--footer-icon-width': `${this.footer_width}px`,
			}
		}
	},


	methods:
	{
		/**
		 * @description Populate page with this screen's tiles
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @returns {void}
		 */
		fetchTiles()
		{
			let screen = this.$root.getScreen(this.$route.params.screen);
			if (screen) this.tiles = screen.tiles
		},


		/**
		 * @description Refresh screen properties
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @returns {void}
		 */
		updateScreen()
		{
			let screen = this.$root.getScreen(this.$route.params.screen);
			if (!screen) return
			this.screen = screen

			this.$root.setBgColour(this.screen.backgroundColorRgb)
		},


		/**
		 * @description Mouse click event handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {string} button `left|center|right`
		 * @return {void}
		 */
		press(button)
		{
			switch (button)
			{
				case 'left':
					this.$root.navigateToUrl('/screen/1')
					break;

				case 'center':
					this.$root.navigateToUrl('/')
					break;

				case 'right':
					this.$root.navigateToUrl('/config')
					break;
			}
		},


		/**
		 * @description Window resize handler
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		resizeHandler()
		{
			// Hack for older browsers
			this.footer_width = this.$refs.footerIconWidth.clientHeight * 0.7
		},
	},


	/**
	 * @description On load
	 * @returns {void}
	 */
	mounted()
	{
		window.addEventListener("resize", this.resizeHandler)
		this.fetchTiles()
		this.updateScreen()
		this.resizeHandler()

		// Send `change` event to broker
		let payload = {
			screen: this.$route.params.screen,
			type: 'screen',
			event: 'change',
			state: 'loaded',
		}
		this.$root.mqttSend(payload)
	},


	/**
	 * @description Called when view is unloaded
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @return {void}
	 */
	unmounted()
	{
		window.removeEventListener("resize", this.resizeHandler)
	},
}
</script>


<template>
	<main bp="grid 6 4@sm 3@md 2@xl" :style="cssVars">
		<template v-for="(tile, index) in tiles" :key="index">
			<template v-if="tile">
				<ButtonDefault v-if="tile.style == 'button'" :tile="tile"></ButtonDefault>
				<ButtonUpDown v-if="tile.style == 'buttonUpDown'" :tile="tile"></ButtonUpDown>
				<ButtonLevelUp v-if="tile.style == 'buttonLevelUp'" :tile="tile"></ButtonLevelUp>
				<ButtonLevelDown v-if="tile.style == 'buttonLevelDown'" :tile="tile"></ButtonLevelDown>
				<ButtonLeftRight v-if="tile.style == 'buttonLeftRight'" :tile="tile"></ButtonLeftRight>
				<ButtonPrevNext v-if="tile.style == 'buttonPrevNext'" :tile="tile"></ButtonPrevNext>
				<ButtonIndicator v-if="tile.style == 'indicator'" :tile="tile"></ButtonIndicator>
				<ButtonLink v-if="tile.style == 'link'" :tile="tile"></ButtonLink>
				<ButtonPickerRgb v-if="tile.style == 'colorPickerRgb'" :tile="tile"></ButtonPickerRgb>
				<ButtonDropDown v-if="tile.style == 'dropDown'" :tile="tile"></ButtonDropDown>
				<ButtonKeyPad v-if="tile.style == 'keyPad'" :tile="tile"></ButtonKeyPad>
				<ButtonRemote v-if="tile.style == 'remote'" :tile="tile"></ButtonRemote>
			</template>
		</template>
	</main>

	<div class="footer-pad">&nbsp;<!-- compensates for fixed footer --></div>

	<footer bp="grid 4" :style="cssVars">
		<template v-if="screen.footer.left">
			<h2>{{ screen.footer.left }}</h2>
		</template>
		<template v-else>
			<button class="icon icon--before icon-_home notext" @click="press('left')">Home</button>
		</template>

		<template v-if="screen.footer.center">
			<button @click="press('center')" ref="footerIconWidth">{{ screen.footer.center }}</button>
		</template>
		<template v-else>
			<button @click="press('center')" ref="footerIconWidth">{{ screen.label }}</button>
		</template>

		<template v-if="screen.footer.right">
			<h2>{{ screen.footer.right }}</h2>
		</template>
		<template v-else>
			<button class="icon icon--before icon-_settings notext" @click="press('right')">Settings</button>
		</template>

	</footer>
</template>
