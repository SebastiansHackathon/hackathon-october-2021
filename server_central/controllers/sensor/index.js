var express = require('express')
var router = express.Router()

var notifier = require('../../utils/notifier')

router.post('/update', (request, response) => {

    console.log(request.body);

    notifier.emit("update", {"sensor": request.body});

    response.send("Success");
});

module.exports = router