const Sequelize = require('sequelize'),

  DBUSER = process.env.MYSQL_USER | 'DBUSER',
  DBPASS = process.env.MYSQL_PASSWORD | 'DBPASS',
  DBHOST = process.env.MYSQL_HOST | 'DBHOST',
  port = process.env.PORT | '8080',
  hostname = process.env.HOSTNAME | '127.0.0.1'

module.exports = {
  host: { hostname, port },

  db: new Sequelize('database', DBUSER, DBPASS, {
    host: DBHOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
}
