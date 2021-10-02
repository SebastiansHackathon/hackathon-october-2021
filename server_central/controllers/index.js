var express = require('express')
var router = express.Router()

router.use('/sensor', require('./sensor'))
router.use('/api', require('./api'))

module.exports = router