
const { db_host , db_user , db_pass , db_name, db_debug } = require('./core/application.js')

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: db_host,
      user: db_user,
      password: db_pass,
      database: db_name,
    },
    migrations: {
      directory: './migrations',
    },
    pool: { min: 0, max: 8 },
    debug:db_debug
  },
}