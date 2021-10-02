var express = require('express')
var router = express.Router()

router.use('/dashboard', require('./dashboard'))
router.use('/challenge', require('./challenges'))


module.exports = router