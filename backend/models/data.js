const { db } = require('../config/configProvider')()

module.exports = function (DataTypes) {
  const Data = db.define(
    'data',
    {
      Data: {
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  )

  return Data
}
