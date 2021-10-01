var express = require('express')
var router = express.Router()

var sensor = require('./sensor')

router.use('/sensor', sensor)

module.exports = router