var express = require('express')
var router = express.Router()

var mongodbutil = require('../../../utils/mongo');
var db = mongodbutil.getDb();

router.get("/:id_challenge", function (req, res) {
    console.log(req.params.id_challenge);

    db.collection('challenges').findOne({
        id: req.params.id_challenge
    }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });

});


module.exports = router