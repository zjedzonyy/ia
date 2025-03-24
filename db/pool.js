const { Pool } = require('pg');
require('dotenv').config();

const config = JSON.parse(process.env.CONFIG);

module.exports = new Pool(config);