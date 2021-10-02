var express = require('express')
var router = express.Router()

var mongodbutil = require('../../../utils/mongo');
var db = mongodbutil.getDb();

router.get('/d', function (req, res) {

    console.log(req.body.display_id);    

    db.collection('displays').find({id: req.body.display_id}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);        

        res.send(result);

    });

})

router.post('/add_display', function (res, req) {

    db.collection('display').insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        res.send(result);
    });

    res.send('post')

});

module.exports = router