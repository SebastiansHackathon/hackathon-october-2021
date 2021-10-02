var express = require('express')
var router = express.Router()

router.use('/content', require('./dashboard'))

module.exports = router