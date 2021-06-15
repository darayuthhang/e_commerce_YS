const { Pool, Client } = require('pg');
let pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'users',
  password: 'password',
  port: 5432,
})

module.exports = {
    pool: pool
}
