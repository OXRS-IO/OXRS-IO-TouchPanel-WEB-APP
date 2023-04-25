<script setup>
import ConfView from '@/views/ConfView.vue'
import ScreenView from '@/views/ScreenView.vue'
import ControlsView from '@/views/ControlsView.vue'
import HomeView from '@/views/HomeView.vue'
import CssIcons from '@/views/CssIcons.vue'
import CssGrid from '@/views/CssGrid.vue'

defineProps({
	bodyView: {
		type: String,
		required: true
	}
})
</script>

<template>
	<HomeView v-if="bodyView == 'home'"></HomeView>
	<ConfView v-if="bodyView == 'config'"></ConfView>
	<ScreenView v-if="bodyView == 'screen'"></ScreenView>
	<ControlsView v-if="bodyView == 'controls'"></ControlsView>
</template>


<style>
*,
::after,
::before
{
	margin: 0;
	padding: 0;
	outline: none;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border-collapse: collapse;
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
}

body
{
	background-color: #000;
	max-height: fill-available;
	max-height: -webkit-fill-available;
	display: grid;
	overflow: hidden;
	user-select: none;
	-webkit-user-select: none;
	height: 100vh;
	font-family: 'Roboto', sans-serif;
	font-size: 18px;
	color: white;
	--footer-height: 4em;
	--footer-height-both: 8em;
}

header
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	display: grid;
	grid-template-columns: 25% auto 25%;
}

header h1
{
	display: flex;
	justify-content: center;
	align-items: center;
}

h1.icon--before:before
{
	display: inline-block;
	position: initial;
	margin-right: 0.5em;
	transform: none;
}
h1.icon--after:after
{
	display: inline-block;
	position: initial;
	margin-left: 0.5em;
	display: inline-block;
}

footer
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	display: grid;
	grid-template-columns: 25% auto 25%;
}

p
{
	margin-bottom: 2rem;
	color: rgba(255,255,255,0.5);
}

button
{
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	background-color: transparent;
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
	margin: 0;
	padding: 0;
	outline: none;
	box-sizing: border-box;
	cursor: pointer;
}


.left
{
	margin-left: 0;
	float: left;
}

.right
{
	margin-right: 0;
	float: right;
}

.header-pad,
.footer-pad
{
	padding: 1rem;
	font-size: 2rem;
}

a:link,
a:visited
{
	text-decoration: none;
	color: inherit;
}
a:hover,
a:active,
a:focus
{
	text-decoration: none;
	color: inherit;
}

.messages
{
	margin-bottom: 2rem;
	list-style: none;
}
.messages .error
{
	background-color: rgb(178,7,53);
	padding: 0.5em;
	color: #fff;
}

.icon--before,
.icon--after
{
	position: relative;
}
.icon--before:before,
.icon--after:after,
.icon--mask
{
	background-color: #fff;
	-webkit-mask-size: 100%;
	mask-size: 100%;
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat;
	-webkit-mask-position: 50%;
	mask-position: 50%;
}
.icon--before:before,
.icon--after:after
{
	content: "";
	height: 70%;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, 25%);
	aspect-ratio: 1 /1;
}

h2.icon--before:before,
h2.icon--after:after
{
	display: inline-block;
	position: relative;
	margin-right: 0.5em;
	height: 1em;
	top: auto;
	left: auto;
}
footer h2:nth-child(2)
{
	text-align: center;
}
footer h2:nth-child(3)
{
	text-align: right;
}
header button,
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
header button:hover,
header button:active,
header button:focus,
footer button:hover,
footer button:active,
footer button:focus
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
}
footer button.state-on
{
	background-color: #fff;
}
footer button.state-on:before,
footer button.state-on:after
{
	background-color: #000;
}

.notext
{
	text-indent: -999em;
}

.tile
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	aspect-ratio: 1 / 1;
	border-radius: 1rem;
	overflow: hidden;
	position: relative;
	align-items: start;
	padding: 1rem;
	color: #fff;
}
.tile:hover
{
	box-shadow: 0 0 1em rgba(0,0,0,0.2);
}
.tile.state-off
{
	background-color: rgba(255,255,255,0.1);
}

.tile.state-on
{
	background-color: rgba(255,255,255,1);
}

.tile .label
{
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	right: 1rem;
	overflow: hidden;
	white-space: pre;
	font-weight: bold;
	color: #fff;
}

@media (max-width: 960px)
{
	.tile .label
	{
		font-size: small;
	}
	header h1,
	footer h2,
	footer button,
	header button
	{
		font-size: 1rem !important;
	}

	body
	{
		--footer-height: 8em;
		--footer-height-both: 12em;
	}
}

.tile .buttons
{
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
}

.tile .image
{
	background-repeat: no-repeat;
	background-size: 180%;
	background-position: center;
	filter: grayscale(1);
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
}

.tile.state-on .label
{
	color: #000;
}

.tile .label span
{
	font-weight: normal;
	color: rgba(255,255,255,0.3);
}

.tile.state-on .label span
{
	color: rgba(0,0,0,0.3);
}

.tile.state-on .label.invert
{
	color: #fff;
}

.tile.state-on .label.invert span
{
	color: rgba(255,255,255,0.3);
}

.tile .icon
{
	aspect-ratio: 1 / 1;
}

.tile.state-on .icon
{
	background-color: rgb(91, 190, 91);
}

.tile.enabled-false .icon
{
	background-color: rgba(0,0,0,0.3) !important;
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

button:disabled
{
	cursor: not-allowed;
}

button.circle
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	border-radius: 50%;
	width: 100%;
	aspect-ratio: 1/1;
	font-weight: bold;
	font-size: 2rem;
	color: #fff;
}
button.circle:hover,
button.circle:active,
button.circle:focus
{
	background-color: rgba(255,255,255,0.2);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
}

button.circle.icon--before:before,
button.circle.icon--after:after
{
	height: 50%;
	transform: translate(-50%,50%);
}

ul button.active
{
	animation: active-animation 2s ease-in-out infinite;
}
@keyframes active-animation
{
	50%
	{
		background-color: #fff;
		color: #000;
	}
}

.colour-container
{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.colour-wheel
{
	border-radius: 50%;
	aspect-ratio: 1 / 1;
	overflow: hidden;
	position: relative;
	height: 100%;
	margin: auto;
}
.colour-wheel:before
{
	background:
		radial-gradient(circle at 50% 0,
			red,
			rgba(242,13,13,.8) 10%,
			rgba(230,26,26,.6) 20%,
			rgba(204,51,51,.4) 30%,
			rgba(166,89,89,.2) 40%,
			hsla(0, 0%, 100%, 0) 50%),
		radial-gradient(circle at 85.35533905932738%
			14.644660940672622%,
			#ffbf00,
			rgba(242,185,13,.8) 10%,
			rgba(230,179,26,.6) 20%,
			rgba(204,166,51,.4) 30%,
			rgba(166,147,89,.2) 40%,
			hsla(0, 0%, 100%, 0) 50%),
		radial-gradient(circle at 100% 50%,
			#80ff00,
			rgba(128,242,13,.8) 10%,
			rgba(128,230,26,.6) 20%,
			rgba(128,204,51,.4) 30%,
			rgba(128,166,89,.2) 40%,
			hsla(90,0%,50%,0) 50%),
		radial-gradient(circle at 85.35533905932738%
			85.35533905932738%,
			#00ff40,
			rgba(13,242,70,.8) 10%,
			rgba(26,230,77,.6) 20%,
			rgba(51,204,89,.4) 30%,
			rgba(89,166,108,.2) 40%,
			hsla(135,0%,50%,0) 50%),
		radial-gradient(circle at 50.00000000000001% 100%,
			#0ff,rgba(13,242,242,.8) 10%,
			rgba(26,230,230,.6) 20%,
			rgba(51,204,204,.4) 30%,
			rgba(89,166,166,.2) 40%,
			hsla(180,0%,50%,0) 50%),
		radial-gradient(circle at 14.64466094067263%
			85.35533905932738%,
			#0040ff,
			rgba(13,70,242,.8) 10%,
			rgba(26,77,230,.6) 20%,
			rgba(51,89,204,.4) 30%,
			rgba(89,108,166,.2) 40%,
			hsla(225,0%,50%,0) 50%),
		radial-gradient(circle at 0 50.00000000000001%,
			#7f00ff,rgba(128,13,242,.8) 10%,
			rgba(128,26,230,.6) 20%,
			rgba(128,51,204,.4) 30%,
			rgba(128,89,166,.2) 40%,
			hsla(270,0%,50%,0) 50%),
		radial-gradient(circle at 14.644660940672615%
			14.64466094067263%,
			#ff00bf,
			rgba(242,13,185,.8) 10%,
			rgba(230,26,179,.6) 20%,
			rgba(204,51,166,.4) 30%,
			rgba(166,89,147,.2) 40%,
			hsla(315,0%,50%,0) 50%);
	transform: rotate(90deg);
	border-radius: 50%;
	position: absolute;
	content: '';
	width: 100%;
	height: 100%;
	z-index: 1;
}
.colour-wheel:after
{
	background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%);
	border-radius: 50%;
	position: absolute;
	content: '';
	width: 100%;
	height: 100%;
	z-index: 1;
}
.colour-wheel:hover
{
	cursor: pointer;
}

.puck
{
	border: 0.5em solid rgba(0,0,0,0.4);
	border-radius: 50%;
	width: 4em;
	height: 4em;
	position: absolute;
	left: 50%;
	top: 50%;
	z-index: 2;
}
.puck:before
{
	border: 0.5em solid rgba(255,255,255,0.4);
	border-radius: 50%;
	width: 3em;
	height: 3em;
	position: absolute;
	left: 0;
	top: 0;
	content: '';
}
.brightness-container
{
	display: flex;
	align-items: center;
}
.brightness-slider
{
	background-color: #fff;
	border: 0.2em solid rgba(255,255,255,0.4);
	margin: auto;
	border-radius: 4rem;
	height: 4em;
	max-width: 1000px;
	position: relative;
	overflow: hidden;
	width: 100%;
}
.brightness-slider:before
{
	background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
}
.brightness-slider .puck
{
	z-index: 2;
	top: -0.2em;
}


@supports not (aspect-ratio: 1 / 1)
{
	.tile
	{
		height: var(--tile-height);
	}
	.tile .icon
	{
		height: var(--icon-height);
	}
	.colour-wheel
	{
		height: var(--wheel-height);
		width: var(--wheel-width);
	}

	header .icon--before:before,
	header .icon--mask,
	header .icon--after:after,
	footer .icon--before:before,
	footer .icon--mask,
	footer .icon--after:after
	{
		width: var(--footer-icon-width);
	}

	.circle
	{
		height: var(--circle-width);
	}
}

.press-animation
{
	-webkit-animation: press-animation 0.2s forwards;
	animation: press-animation 0.2s forwards;
}
.bounce-animation
{
	-webkit-animation: bounce-animation 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
	animation: bounce-animation 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
@keyframes press-animation
{
	0% { transform: scale(1); }
	100% { transform: scale(0.9); }
}
@keyframes bounce-animation
{
	0% { transform: scale(0.9); }
	25% { transform: scale(0.9, 1.09); }
	50% { transform: scale(1.09, 0.9); }
	75% { transform: scale(0.95, 1.05); }
	100% {transform: scale(1); }
}
</style>
