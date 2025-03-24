require('dotenv').config();
const { Pool } = require('pg');

// Parsowanie CONFIG
const config = process.env.CONFIG ? JSON.parse(process.env.CONFIG) : {};

module.exports = new Pool(config);
