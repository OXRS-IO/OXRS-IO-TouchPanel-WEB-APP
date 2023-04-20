<script>
export default
{
	data()
	{
		return {
			host: null,
			port: null,
			username: null,
			password: null,
			device: null,
			prefix: null,
			suffix: null,
			ssl: null,
			dt: new Date(this.$root.$version),
			changed: false,
		}
	},


	watch: {
		host: { handler: function(val) { return this.hasChanged(val, this.$root.host) }, deep: true },
		port: { handler: function(val) { return this.hasChanged(val, this.$root.port) }, deep: true },
		username: { handler: function(val) { return this.hasChanged(val, this.$root.device) }, deep: true },
		password: { handler: function(val) { return this.hasChanged(val, this.$root.username) }, deep: true },
		device: { handler: function(val) { return this.hasChanged(val, this.$root.password) }, deep: true },
		prefix: { handler: function(val) { return this.hasChanged(val, this.$root.prefix) }, deep: true },
		suffix: { handler: function(val) { return this.hasChanged(val, this.$root.suffix) }, deep: true },
		ssl: { handler: function(val) { return this.hasChanged(val, this.$root.ssl) }, deep: true },
	},


	methods:
	{
		/**
		 * @description Process form submission
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
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
		},


		/**
		 * @description Populate form
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		updateForm()
		{
			host.value = this.$root.host
			port.value = this.$root.port
			username.value = this.$root.username
			password.value = this.$root.password
			device.value = this.$root.device
			prefix.value = this.$root.prefix
			suffix.value = this.$root.suffix
			ssl.checked = this.$root.ssl
		},


		/**
		 * @description Determine if form has changed
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		hasChanged(value, def)
		{
			if (value != def) this.changed = true
		},


		/**
		 * @description Handle toggle fullscreen button event
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		fullscreen()
		{
			this.$root.toggleFullscreen()
		},


		/**
		 * @description Cancel changes
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		cancel()
		{
			this.$root.navigateToUrl('/')
		},
	},


	/**
	 * @description On load
	 * @returns {void}
	 */
	mounted()
	{
		this.updateForm()
		this.$root.setBgColour({r: 0, g: 0, b: 0})
	},
}
</script>

<template>
	<form action="" bp="container">

		<h2 class="logo-before">MQTT broker&nbsp;configuration</h2>

		<p>Build: {{ `${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}` }} UTC</p>

		<div bp="grid">
			<div bp="12 9@lg">
				<label for="host">Host: IP address or hostname of your broker's websocket</label>
				<input type="text" name="host" v-model="host" id="host" placeholder="192.168.1.123, localhost, xyz.com" />
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

		<div bp="grid vertical-end">
			<div bp="12 9@lg">
				<label for="device">Client ID:</label>
				<input type="text" name="device" v-model="device" id="device" placeholder="TouchPanelWeb" />
			</div>

			<div bp="12 3@lg">
				<label for="ssl" class="form-checkbox">
					<input type="checkbox" name="ssl" v-model="ssl" id="ssl" value="1" />
					<span class="checkmark"></span>
					<span class="label">Enable SSL</span>
				</label>
			</div>
		</div>

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

		<button class="right icon icon--before icon-_fullscreen" type="button" @click="fullscreen">Fullscreen</button>

		<template v-if="!this.$root.mqtt || !this.$root.mqtt.isConnected() || this.changed">
			<button @click="submit" type="button" class="submit">Connect</button>
		</template>

		<template v-if="this.$root.mqtt && this.$root.mqtt.isConnected()">
			<button class="icon icon--before icon-_left" type="button" @click="cancel">Cancel</button>
		</template>

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

button.submit
{
	background-color: #4ec5ff;
	margin-right: 1em;
	padding: 1rem;
	border-radius: 0.5rem;
	color: rgba(0,0,0,0.8);
}
button.submit:hover,
button.submit:active,
button.submit:focus
{
	background-color: #fff;
}


.form-checkbox
{
	display: block;
	margin-bottom: 2em;
	position: relative;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.form-checkbox input
{
	margin: 0;
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}
.form-checkbox .checkmark
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	margin: 0 0.5em 0 0;
	border-radius: 0.5rem;
	display: inline-block;
	position: relative;
	height: 2em;
	width: 2em;
}
.form-checkbox .label
{
	display: inline-block;
	height: 2.5em;
    vertical-align: middle;
}
.form-checkbox:hover input ~ .checkmark
{
	background-color: rgba(255,255,255,0.2);
}
.form-checkbox input:active ~ .checkmark,
.form-checkbox input:focus ~ .checkmark
{

	box-shadow: 0 0 10px 1px #4ec5ff;
}
.form-checkbox input:active ~ .checkmark
.form-checkbox input:focus ~ .checkmark
{
	background-color: #4ec5ff;
	box-shadow: 0 0 10px 1px #4ec5ff;
}
.form-checkbox input:checked ~ .checkmark
{
	background-color: #4ec5ff;
}
.form-checkbox .checkmark:after
{
	content: "";
	position: absolute;
	display: none;
}
.form-checkbox input:checked ~ .checkmark:after
{
	display: block;
}
.form-checkbox .checkmark:after
{
	left: 0.7em;
	top: 0.1em;
	width: 0.7em;
	height: 1.8em;
	border: solid black;
	border-width: 0 0.3em 0.3em 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}

button.icon
{
	background-color: rgba(255,255,255,0.1);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	padding: 1rem;
	border-radius: 0.5rem;
	min-width: 6em;
	text-indent: -999em;
}

button.icon:hover,
button.icon:active,
button.icon:focus
{
	background-color: rgba(255,255,255,0.3);
}

button.icon--before:before,
button.icon-after:after
{
	height: 50%;
	transform: translate(-50%,50%);
}
</style>
