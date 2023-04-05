<script setup>
defineProps({
	host: {
		type: String,
		default: localStorage.host,
		required: true
	},
	port: {
		type: Number,
		default: localStorage.port,
		required: true
	},
	username: {
		type: String,
		default: localStorage.username,
		required: false
	},
	password: {
		type: String,
		default: localStorage.password,
		required: false
	},
	device: {
		type: String,
		default: localStorage.device,
		required: true
	},
})
</script>

<script>
export default
{
	methods:
	{
		/**
		 * @description Process form submission
		 * @memberof ConfView
		 * @return {false}
		 */
		submit()
		{
			this.$root.host = host.value
			this.$root.port = port.value
			this.$root.device = device.value
			this.$root.username = username.value
			this.$root.password = password.value
			this.$root.prefix = prefix.value
			this.$root.suffix = suffix.value
			this.$root.ssl = ssl.checked ? true : false

			this.$root.connectMqtt()
			return false
		}
	},
}
</script>

<template>
	<form action="" bp="container">

		<h2 class="logo-before">MQTT broker&nbsp;configuration</h2>

		<div bp="grid">
			<div bp="12 9@lg">
				<label for="host">Host: IP address or hostname of your broker's websocket</label>
				<input type="text" name="host" v-model="host" id="host" placeholder="192.168.1.123 or oxrs.local" />
			</div>

			<div bp="12 3@lg">
				<label for="port">Port:</label>
				<input type="text" name="port" v-model="port" id="port" placeholder="9001" />
			</div>
		</div>

		<div bp="grid">
			<div bp="12 6@lg">
				<label for="username">Username:</label>
				<input type="text" name="user" v-model="username" id="username" />
			</div>

			<div bp="12 6@lg">
				<label for="password">Password:</label>
				<input type="password" name="password" v-model="password" id="password" />
			</div>
		</div>

		<label for="device">Client ID:</label>
		<input type="text" name="device" v-model="device" id="device" placeholder="TpEsp32" />

		<div bp="grid">
			<div bp="12 6@lg">
				<label for="prefix">Topic prefix:</label>
				<input type="text" name="prefix" v-model="prefix" id="prefix" />
			</div>

			<div bp="12 6@lg">
				<label for="suffix">Topic suffix:</label>
				<input type="text" name="suffix" v-model="suffix" id="suffix" />
			</div>
		</div>

		<div>
			<label for="ssl" class="form-checkbox">Enable SSL
				<input type="checkbox" name="ssl" v-model="ssl" id="ssl" value="1" />
				<span class="form-checkmark"></span>
			</label>
		</div>

		<button @click="submit" type="button">Connect</button>

	</form>
</template>

<style scoped>
body {
	background-color: #000;
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
	aspect-ratio: 1 / 1;
	vertical-align: middle;
}
label
{
	margin-bottom: 0.5rem;
	display: block;
	color: #fff;
}

input
{
	background-color: rgba(255,255,255,0.1);
	margin-bottom: 2rem;
	padding: 1rem;
	display: block;
	width: 100%;
	border: none;
	border-radius: 0.5rem;
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	font-size: large;
	color: #fff;
}

input:hover
{
	background-color: rgba(255,255,255,0.2);
}

input:active,
input:focus
{
	outline: none;
	background-color: rgba(255,255,255,0.2);
	box-shadow: 0 0 10px 1px #4ec5ff;
}

form button
{
	background-color: #48c0c7;
	padding: 1rem;
	border-radius: 0.5rem;
	color: rgba(0,0,0,0.8);
}
form button:hover,
form button:active,
form button:focus
{
	background-color: #fff;
}


.form-checkbox
{
	display: inline-block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 2rem;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.form-checkbox input
{
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}
.form-checkmark
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	border-radius: 0.5rem;
	position: absolute;
	height: 25px;
	width: 25px;
	top: 0;
	left: 0;
}
.form-checkbox:hover input ~ .form-checkmark,
.form-checkbox input:active ~ .form-checkmark,
.form-checkbox input:focus ~ .form-checkmark
{
	background-color: rgba(255,255,255,0.2);
}
.form-checkbox input:active ~ .form-checkmark
.form-checkbox input:focus ~ .form-checkmark
{
	background-color: #4ec5ff;
}
.form-checkbox input:checked ~ .form-checkmark
{
	background-color: #4ec5ff;
}
.form-checkmark:after
{
	content: "";
	position: absolute;
	display: none;
}
.form-checkbox input:checked ~ .form-checkmark:after
{
	display: block;
}
.form-checkbox .form-checkmark:after
{
	left: 8px;
	top: 2px;
	width: 10px;
	height: 20px;
	border: solid black;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
