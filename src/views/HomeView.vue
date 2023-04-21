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

	<div bp="container">
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
	</div>

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

button
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

button:hover,
button:active,
button:focus
{
	background-color: rgba(255,255,255,1);
	color: #000;
}
</style>
