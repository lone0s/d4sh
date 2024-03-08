// db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "d4sh",
  password: "",
  port: 5432,
});

module.exports = pool;
