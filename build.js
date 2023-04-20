const fs = require('fs');
const filepath = './src/main.js';
const dt = new Date();
const data = fs.readFileSync(filepath);
fs.writeFileSync(filepath, String(data).replace(/\"\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\"/, `"${dt.toISOString()}"`));
