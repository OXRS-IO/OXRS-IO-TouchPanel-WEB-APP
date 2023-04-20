<script setup>
import Paho from 'paho-mqtt'
import router from './router'
import Screen from '@/models/Screen'
import CryptoJS from 'crypto-js/crypto-js'
</script>

<script>
export default
{
	/**
	 * @description Preps data used by OXRS-IO-TouchPanel-WEB-APP
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @returns {Object}
	 */
	data()
	{
		return {
			host: localStorage.host ? JSON.parse(localStorage.host) ? this.decrypt(JSON.parse(localStorage.host), document.location.host) : null : null,
			port: localStorage.port ? JSON.parse(localStorage.port) ? this.decrypt(JSON.parse(localStorage.port), document.location.host) : null : null,
			username: localStorage.username ? JSON.parse(localStorage.username) ? this.decrypt(JSON.parse(localStorage.username), document.location.host) : null : null,
			password: localStorage.password ? JSON.parse(localStorage.password) ? this.decrypt(JSON.parse(localStorage.password), document.location.host) : null : null,
			device: localStorage.device ? JSON.parse(localStorage.device) ? this.decrypt(JSON.parse(localStorage.device), document.location.host) : null : null,
			prefix: localStorage.prefix ? JSON.parse(localStorage.prefix) ? this.decrypt(JSON.parse(localStorage.prefix), document.location.host) : null : null,
			suffix: localStorage.suffix ? JSON.parse(localStorage.suffix) ? this.decrypt(JSON.parse(localStorage.suffix), document.location.host) : null : null,
			ssl: localStorage.ssl ? JSON.parse(localStorage.ssl) ? true : false : false,
			mqtt: null,
			screens: [],
		}
	},


	methods:
	{
		/**
		 * @description Connect to MQTT broker
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @returns {void}
		 */
		connectMqtt()
		{
			let prefix = this.prefix ? `${this.prefix}/` : ''
			let suffix = this.suffix ? `/${this.suffix}` : ''

			if (this.mqtt) this.mqtt.disconnect()

			this.mqtt = new Paho.Client(this.host, Number(this.port), this.device)
			this.mqtt.onConnectionLost = this.mqttOnDisconnect
			this.mqtt.onMessageArrived = this.mqttOnReceive
			this.mqtt.trace = this.mqttOnTrace

			let lwt = new Paho.Message(`{"online":false}`)
			lwt.destinationName = `${prefix}stat/${this.device}${suffix}/lwt`

			let options = {
				onSuccess: this.mqttOnConnect,
				useSSL: this.ssl,
				mqttVersion: 3,
				willMessage: lwt
			}

			if (this.username) options.userName = this.username
			if (this.password) options.password = this.password

			try
			{
				this.mqtt.connect(options)
			}
			catch (err)
			{
				alert(err);
				this.navigateToUrl('/config')
			}
		},


		/**
		 * @description Called when the MQTT client connects to the broker
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @returns {void}
		 */
		mqttOnConnect()
		{
			// Store config in local storage - we know it works at this point
			localStorage.host = JSON.stringify(this.host ? this.encrypt(this.host, document.location.host) : null)
			localStorage.port = JSON.stringify(this.port ? this.encrypt(this.port, document.location.host) : null)
			localStorage.device = JSON.stringify(this.device ? this.encrypt(this.device, document.location.host) : null)
			localStorage.username = JSON.stringify(this.username ? this.encrypt(this.username, document.location.host) : null)
			localStorage.password = JSON.stringify(this.password ? this.encrypt(this.password, document.location.host) : null)
			localStorage.prefix = JSON.stringify(this.prefix ? this.encrypt(this.prefix, document.location.host) : null)
			localStorage.suffix = JSON.stringify(this.suffix ? this.encrypt(this.suffix, document.location.host) : null)
			localStorage.ssl = JSON.stringify(this.ssl ? true : false)

			// Format prefix and suffix, if set
			let prefix = this.prefix ? `${this.prefix}/` : ''
			let suffix = this.suffix ? `/${this.suffix}` : ''

			// Subscribe to `conf` and `cmnd` topics
			this.mqtt.subscribe(`${prefix}conf/${this.device}${suffix}`)
			this.mqtt.subscribe(`${prefix}cmnd/${this.device}${suffix}`)

			// Publish online status
			let lwt = new Paho.Message(`{"online":true}`)
			lwt.destinationName = `${prefix}stat/${this.device}${suffix}/lwt`
			this.mqtt.send(lwt)

			try
			{
				let params = new URLSearchParams(window.location.search)

				if (params.get('screen') != null)
				{
					// Redirect to given screen
					this.navigateToUrl(`/screen/${params.get('screen')}`)
				}
				else
				{
					// Redirect to `home page`
					this.navigateToUrl('/')
				}
			}
			catch (error)
			{
				console.log(error)
			}
		},


		/**
		 * @description Called when the MQTT client lost its connection to the broker
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} response
		 * @returns {void}
		 */
		mqttOnDisconnect(error)
		{
			console.log(error)

			if (error.errorCode == 0) return

			this.mqtt = null
			this.navigateToUrl('/config')
		},


		/**
		 * @description Send a message to the MQTT broker
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {string} payload
		 * @returns {void}
		 */
		mqttSend(message)
		{
			// Format prefix and suffix, if set
			let prefix = this.prefix ? `${this.prefix}/` : ''
			let suffix = this.suffix ? `/${this.suffix}` : ''

			let msg = new Paho.Message(JSON.stringify(message))
			msg.destinationName = `${prefix}stat/${this.device}${suffix}`

			this.mqtt.send(msg)
		},


		/**
		 * @description Called when the MQTT client receives a message from the broker
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} message
		 * @returns {void}
		 */
		mqttOnReceive(message)
		{
			// Format prefix and suffix, if set
			let prefix = this.prefix ? `${this.prefix}/` : ''
			let suffix = this.suffix ? `/${this.suffix}` : ''

			// Determine topic
			switch (message.topic)
			{
				// Parse config message
				case `${prefix}conf/${this.device}${suffix}`:
					this.processConf(message.payloadString)
					break;

				// Parse command message
				case `${prefix}cmnd/${this.device}${suffix}`:
					this.processCmnd(message.payloadString)
					break;

				// Should never happen
				default:
					break;
			}
		},


		/**
		 * @description Called when the MQTT client logs a trace message
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} message
		 * @returns {void}
		 */
		mqttOnTrace(message)
		{
			// Add debugging here
		},



		/**
		 * @description Process `configuration` payload
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} data
		 * @returns {void}
		 */
		processConf(data)
		{
			try
			{
				// Convert JSON string into Object
				data = JSON.parse(data)
			}
			catch (err)
			{
				alert('Malformed configuration!')
				return
			}

			// Populate/update screens
			if ('screens' in data) this.updateScreens(data.screens)

			// Update page colour
			if ('backgroundColorRgb' in data) this.updateBackground(data.backgroundColorRgb)

			// Update all icons colour
			if ('iconOnColorRgb' in data) this.updateIconColors(data.iconOnColorRgb)
		},


		/**
		 * @description Process `command` payload
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} data
		 * @returns {void}
		 */
		processCmnd(data)
		{
			try
			{
				// Convert JSON string into Object
				data = JSON.parse(data)
			}
			catch (err)
			{
				// Ignore bad payloads. Should we complain?
				return
			}

			if (typeof data != 'object') return

			// Update screen properties
			if ('screens' in data) this.updateScreens(data.screens)

			// Update tile properties
			if ('tiles' in data) this.updateTiles(data.tiles)

			// Update page colour
			if ('backgroundColorRgb' in data) this.updateBackground(data.backgroundColorRgb)

			// Update all icons colour
			if ('iconOnColorRgb' in data) this.updateIconColors(data.iconOnColorRgb)

			// Navigate to screen
			if ('screen' in data) this.navigateToUrl(`/screen/${data.screen.load}`)

			// Show msg
			if ('message' in data) alert(`${data.message.title}\n${data.message.text}`)

			// Add custom icon
			if ('addIcon' in data) this.addIcon(data.addIcon)
		},


		/**
		 * @description Update or add Screens to the application
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Array} list List of screens to add
		 * @returns {void}
		 */
		updateScreens(list)
		{
			for (let idx in list)
			{
				let screen = this.getScreen(list[idx].screen)

				if (screen)
				{
					screen.update(list[idx])
				}
				else
				{
					this.screens.push(new Screen(list[idx], this))
				}
			}
		},


		/**
		 * @description Get screen for given ID
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Number} id Screen ID
		 * @returns {Screen}
		 */
		getScreen(id)
		{
			let screen = this.screens.find(idx => idx.id == id)
			if (screen) return screen
			return null
		},


		/**
		 * @description Update tile properties
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Array} list List of tiles
		 * @return {void}
		 */
		updateTiles(list)
		{
			for (let idx in list)
			{
				if (!('screen' in list[idx])) continue
				if (!('tile' in list[idx])) continue

				let screen = this.getScreen(list[idx].screen)
				if (!screen) continue

				let tile = screen.getTile(list[idx].tile)
				if (!tile) continue

				if ('action' in list[idx] && list[idx]['action'] == 'remove')
				{
					screen.removeTile(list[idx].tile)
					continue;
				}

				try
				{
					tile.update(list[idx])
				}
				catch (error)
				{
					console.log(error)
				}
			}
		},


		/**
		 * @description Update body color
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} data {r: (int) 0-255, g: (int) 0-255, b: (int) 0-255}
		 * @return {void}
		 */
		updateBackground(data)
		{
			for (let s in this.screens)
			{
				if (typeof this.screens[s] == 'undefined') continue

				this.screens[s].update({'backgroundColorRgb': data})
			}
		},


		/**
		 * @description Update all icons active color
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} data {r: (int) 0-255, g: (int) 0-255, b: (int) 0-255}
		 * @return {void}
		 */
		updateIconColors(data)
		{
			// Validate payload
			if (typeof data != 'object') data = {}

			for (let s in this.screens)
			{
				if (typeof this.screens[s] == 'undefined') continue

				for (let t in this.screens[s].tiles)
				{
					if (typeof this.screens[s].tiles[t] == 'undefined') continue

					this.screens[s].tiles[t].update({'iconColorRgb': data})
				}
			}
		},


		/**
		 * @description Add custom icon
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {Object} data {name: (string), imageBase64: (string)}
		 * @return {void}
		 */
		addIcon(data)
		{
			if (typeof data != 'object') return
			if (!('name' in data)) return
			if (!('imageBase64' in data)) return

			let mime = this.detectMimeType(data.imageBase64)

			if (!mime) return

			let style = document.createElement('style');
			let text = document.createTextNode(`.icon--before.icon-${data.name}:before, .icon--after.icon-${data.name}:after, .icon--mask.icon-${data.name} { -webkit-mask-image: url(${mime}${data.imageBase64}); mask-image: url(${mime}${data.imageBase64}); }`);

			style.appendChild(text);
			document.head.appendChild(style)
		},


		/**
		 * @description Navigate to given URL
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {string} url
		 * @return {void}
		 */
		navigateToUrl(url)
		{
			router.push(url)
		},


		/**
		 * @description Encrypts string
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} str String to encode
		 * @param {String} key
		 * @returns {String} Encrypted string
		 */
		encrypt(str, key)
		{
			return CryptoJS.AES.encrypt(str, key).toString()
		},


		/**
		 * @description Decrypts string
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {String} str String to decode
		 * @param {String} key
		 * @return {String} Decrypted string
		 */
		decrypt(str, key)
		{
			return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8)
		},


		/**
		 * @description Toggle fullscreen
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		toggleFullscreen()
		{
			let bod = document.querySelector('body')

			if (document.fullscreenElement === null || document.webkitFullscreenElement === null)
			{
				if (bod.requestFullscreen)
				{

					bod.requestFullscreen().catch((error) =>
					{
						console.log(error)
					})
				}
				else if (bod.webkitRequestFullScreen)
				{

					bod.webkitRequestFullScreen().catch((error) =>
					{
						console.log(error)
					})
				}
			}
			else
			{
				if (document.exitFullscreen)
				{
					document.exitFullscreen()
				}
				else if (document.webkitCancelFullScreen)
				{
					document.webkitCancelFullScreen()
				}
			}
		},


		/**
		 * @description Set body background colour
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @return {void}
		 */
		setBgColour(data)
		{
			if (typeof data != "object") return
			if (!('r' in data)) return
			if (!('g' in data)) return
			if (!('b' in data)) return

			document.querySelector('body').setAttribute('style', `background-color: rgb(${data.r}, ${data.g}, ${data.b})`)
		},



		/**
		 * @description Determine mime type from base64 encoded string
		 * @memberof OXRS-IO-TouchPanel-WEB-APP
		 * @param {string} base64
		 */
		detectMimeType(base64)
		{
			const signatures = {
				'R0lGOD': 'data:image/gif;base64,',
				'iVBORw0KGgo': 'data:image/png;base64,',
				'/9j/': 'data:image/jpg;base64,',
				'PHN2Zy': 'data:image/svg+xml;base64,',
				'Qk0=': 'data:image/bmp;base64,',
			}

			for (let s in signatures)
			{
				if (String(base64).indexOf(s) === 0) return signatures[s];
			}

			return false;
		},
	},


	/**
	 * @description Entry into (OXRS-IO-TouchPanel-WEB-APP) App.vue
	 * @memberof OXRS-IO-TouchPanel-WEB-APP
	 * @returns {void}
	 */
	mounted()
	{
		// Check for saved config
		if (this.host != null && this.port != null)
		{
			// Found config, connect to broker
			this.connectMqtt()
		} else {
			// Redirect browser to config screen
			this.navigateToUrl('/config')
		}
	}

}
</script>

<template>
	<RouterView />
</template>
