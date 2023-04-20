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

@viewport
{
	width: device-width;
	zoom: 1.0;
}

body
{
	background-color: #000;
	font-family: sans-serif;
	font-size: 18px;
	padding: 1rem;
}

header
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	z-index: 2;
	width: 100%;
	position: fixed;
	left: 0;
	top: 0;
	text-align: center;
	color: #fff;
}
footer
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	z-index: 2;
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
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
header h2,
footer h2
{
	padding: 1rem;
	color: #fff;
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
header button.icon--before:before,
footer button.icon--before:before
{
	background-color: rgba(255,255,255,0.6);
}
header button:hover.icon--before:before,
footer button:hover.icon--before:before
{
	background-color: rgba(255,255,255,1);
}
header button:nth-child(1)
footer button:nth-child(1)
{
	text-align: left;
}
header button:nth-child(2),
footer button:nth-child(2)
{
	text-align: center;
}
header button:nth-child(3),
footer button:nth-child(3)
{
	text-align: right;
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
	header h2,
	footer h2,
	footer button,
	header button
	{
		font-size: smaller !important;
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

button:disabled
{
	cursor: not-allowed;
}

.colour-picker {
	position: relative;
	max-width: 500px;
	margin: 0 auto;
}

.colour-picker:hover
{
	cursor: pointer;
}

.colour-wheel
{
	position: relative;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	overflow: hidden;
}

.colour-wheel .rainbow
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
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transform: rotate(90deg);
}

.colour-wheel .white
{
	background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.puck
{
	border: 0.5em solid rgba(0,0,0,0.4);
	border-radius: 50%;
	width: 4em;
	height: 4em;
	position: absolute;
	left: 0;
	top: 0;
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

.brightness-slider
{
	border: 0.2em solid rgba(255,255,255,0.4);
	margin: 2em 0;
	height: 4em;
	border-radius: 4rem;
	position: relative;
	overflow: hidden;
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
