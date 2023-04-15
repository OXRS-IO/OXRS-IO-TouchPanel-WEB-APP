<script setup>
import ButtonDefault from '@/components/ButtonDefault.vue'
import ButtonUpDown from '@/components/ButtonUpDown.vue'
import ButtonLevelDown from '@/components/ButtonLevelDown.vue'
import ButtonLevelUp from '@/components/ButtonLevelUp.vue'
import ButtonLeftRight from '@/components/ButtonLeftRight.vue'
import ButtonPrevNext from '@/components/ButtonPrevNext.vue'
import ButtonLink from '@/components/ButtonLink.vue'
import ButtonIndicator from '@/components/ButtonIndicator.vue'
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
			() => this.$root.screens[this.$route.params.id],
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


	methods:
	{
		/**
		 * @description Populate page with this screen's tiles
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @returns {void}
		 */
		fetchTiles()
		{
			let screen = this.$root.getScreen(this.$route.params.id);
			if (screen) this.tiles = screen.tiles
		},


		/**
		 * @description Refresh screen properties
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @returns {void}
		 */
		updateScreen()
		{
			let screen = this.$root.getScreen(this.$route.params.id);
			if (!screen) return
			this.screen = screen

			this.screen.applyBgColor()
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
	},


	/**
	 * @description On load
	 * @returns {void}
	 */
	mounted()
	{
		this.fetchTiles()
		this.updateScreen()
	},
}
</script>


<template>
	<main bp="grid 6 4@sm 3@md 2@xl" :style="cssVars">
		<template v-for="(tile, index) in tiles" :key="index">
			<template v-if="tile">
				<ButtonDefault v-if="tile.style == 'button'" :tile="tile"></ButtonDefault>
				<buttonUpDown v-if="tile.style == 'buttonUpDown'" :tile="tile"></buttonUpDown>
				<ButtonLevelUp v-if="tile.style == 'buttonLevelUp'" :tile="tile"></ButtonLevelUp>
				<ButtonLevelDown v-if="tile.style == 'buttonLevelDown'" :tile="tile"></ButtonLevelDown>
				<ButtonLeftRight v-if="tile.style == 'buttonLeftRight'" :tile="tile"></ButtonLeftRight>
				<ButtonPrevNext v-if="tile.style == 'buttonPrevNext'" :tile="tile"></ButtonPrevNext>
				<ButtonIndicator v-if="tile.style == 'indicator'" :tile="tile"></ButtonIndicator>
				<ButtonDefault v-if="tile.style == 'dropDown'" :tile="tile"></ButtonDefault>
				<ButtonLink v-if="tile.style == 'link'" :tile="tile"></ButtonLink>
			</template>
		</template>
	</main>

	<div class="footer-pad">&nbsp;<!-- compensates for fixed footer --></div>

	<footer bp="grid 4">
		<template v-if="screen.footer.left">
			<h2>{{ screen.footer.left }}</h2>
		</template>
		<template v-else>
			<button class="icon icon--before icon-_home" @click="press('left')"></button>
		</template>

		<template v-if="screen.footer.center">
			<button @click="press('center')">{{ screen.footer.center }}</button>
		</template>
		<template v-else>
			<button @click="press('center')">{{ screen.label }}</button>
		</template>

		<template v-if="screen.footer.right">
			<h2>{{ screen.footer.right }}</h2>
		</template>
		<template v-else>
			<button class="icon icon--before icon-_settings" @click="press('right')"></button>
		</template>

	</footer>
</template>

<style scoped>
footer h2
{
	padding: 1rem;
}
footer button
{
	padding: 1rem;
	width: 100%;
	display: block;
	overflow: hidden;
	-webkit-mask-size: 10%;
	mask-size: 10%;
	border-radius: 1rem;
	font-size: 2rem;
	color: #fff;
}
footer button:hover,
footer button:active,
footer button:focus
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
}
footer button.icon--before:before
{
	background-color: rgba(255,255,255,0.6);
}
footer button:hover.icon--before:before
{
	background-color: rgba(255,255,255,1);
}

footer button:nth-child(1)
{
	text-align: left;
}
footer button:nth-child(2)
{
	text-align: center;
}
footer button:nth-child(3)
{
	text-align: right;
}
</style>
