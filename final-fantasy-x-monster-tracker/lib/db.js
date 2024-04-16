const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  user: 'root',
  host: 'localhost',
  database: 'ffx-prod',
  password: 'password1234'
});

module.exports = pool;
