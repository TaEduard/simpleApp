const sequelize = require('sequelize')
const { Op, DataTypes } = sequelize
const Data = require('../models/data')(sequelize, DataTypes)
const DataController = require('express').Router()

const isNull = x => x === null || x === undefined


DataController.get('/', async (req, res, next) => {
  try {
    const data = await Data.findAll()
    if (!isNull(data))
      res.json({ data })
  } catch (error) {
    console.log(error)
    res.statusCode(300).send()
  }
})

module.exports = DataController