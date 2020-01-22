const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  { name, version } = require('./package.json'),
  { host } = require('./config/configProvider')(),
  cors = require('cors')
app.get('/', (_, res) => {
  res.json({
    name,
    version,
    env: process.env.ENV || "unknown",
  })
})
app.use(cors())
app.use('/data', require('./controllers/dataController'))

const PORT = host.port
const HOSTNAME = host.hostname
const main = async () => {
  server.listen(PORT, HOSTNAME, err => {
    console.log(`Server started on port ${PORT}`)
    console.log(`APP Running at baseURL: ${HOSTNAME}`)
  })
}

main()