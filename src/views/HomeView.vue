<script>
export default
{
	data()
	{
		return {
			screens: [],
		}
	},


	/**
	 * @description Populate this page with a list of screens as navigation buttons
	 * @return {void}
	 */
	mounted()
	{
		this.screens = this.$root.screens;
		this.$root.setBgColour({r: 0, g: 0, b: 0})
	},
}
</script>

<template>

	<main bp="container">
		<div bp="text-center">
			<h2 class="logo-before">OXRS Touch&nbsp;Panel</h2>
		</div>
		<ul>
			<template v-for="(screen, index) in screens" :key="index">
				<li v-if="!screen.hidden">
					<button @click="this.$root.navigateToUrl(`/screen/${screen.id}`)">{{ screen.label }}</button>
				</li>
			</template>
			<li>
				<button @click="this.$root.navigateToUrl('/config')">Settings</button>
			</li>
		</ul>
	</main>

</template>

<style scoped>
main
{
	padding: 1em;
}

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
</style>
