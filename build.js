/**
 * @description Every time project is built this script injects the build-date into `main.js`
 * @see package.json: `scripts.build`
 */
const fs = require('fs');
const filepath = './src/main.js';
const dt = new Date();

// Fetch contents of `main.js`
const data = fs.readFileSync(filepath);

// Replace previous build-date with current date, and save to file
fs.writeFileSync(filepath, String(data).replace(/\"\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\"/, `"${dt.toISOString()}"`));
