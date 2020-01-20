const Sequelize = require('sequelize')

module.exports = {
  host: {
    hostname: '127.0.0.1',
    port: '8080'
  },
  db: new Sequelize('database', 'DBUSER', 'DBPASS', {
    host: 'DBHOST',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
}
