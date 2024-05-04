const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Limit the maximum number of connections in the pool
  host: "b71q97trkhiewlalitkg-mysql.services.clever-cloud.com",
  user: "uhpv1amzdvkrs8uv",
  password: "ngAtLGUoLSgKN2WbK3ak",
  database: "b71q97trkhiewlalitkg",
});

module.exports = pool;