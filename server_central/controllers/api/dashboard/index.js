var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('content index')
})

router.post('/add_data', function(res, req) {

    res.send('post')

});

module.exports = router