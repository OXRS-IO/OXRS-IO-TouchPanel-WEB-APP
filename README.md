# OXRS IO TouchPanel WEB APP

## This is work in progress

Web app version of the [OXRS IO TouchPanel](https://oxrs.io/docs/firmware/touch-panel-esp32.html), which aims to mirror functionality for use within a web browser.

### Caveats

The NodeJS `paho-mqtt` library does not support self-signed TLS certificates. Solutions:
| Broker | Browser |
|---|---|
| CA-signed certificate | HTTPS |
| TLS disabled | HTTP |

### Useage

[Documentation found here](https://oxrs.io/docs/firmware/touch-panel-esp32.html) for the mqtt payloads.

#### Enabling web-sockets

Websocket support on the MQTT broker is required for MQTT communication within a browser. Here's a [tutorial for Mosquitto](http://www.steves-internet-guide.com/mqtt-websockets/).

#### Serving via node-red

See Node Red's example on [serving local files](https://cookbook.nodered.org/http/serve-a-local-file)

You'll need to serve 4 files, located in the `dist` directory of this repo:

- index.html `content-type: text/html; charset=utf-8`
- /assets/index.js `content-type: application/javascript`
- /assets/TemplateView.css `content-type: text/css`
- /assets/TemplateView.js `content-type: application/javascript`
