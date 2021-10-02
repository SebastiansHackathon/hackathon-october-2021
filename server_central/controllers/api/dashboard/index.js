var express = require('express')
var router = express.Router()

var mongodbutil = require('../../../utils/mongo');
var db = mongodbutil.getDb();

router.get('/display/:display_id', function (req, res) {

    console.log(req.params.display_id);

    db.collection('displays').findOne({ id: req.params.display_id } , function (err, result) {
        if (err) throw err;

        console.log(result);

        delete result.history;

        var mocked_data = {
            url_webcam: "",
            meteo: {
                temperature: "",
                humidity: "",
                pressure: "",
                wind_speed: "",
            }
        }

        data_return = {
            result,
            mocked_data
        }

        res.send(data_return);

    });

})

router.post('/display', function (req, res) {

    /*
    NEW DATA
    {
        "name": "Display Test 1",
        "location": "Bolzano",
        "pirId": "0001",
        "id": "aaa-0001",
        "media": []
    }
    */

    db.collection('displays').insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        res.send(result);
    });
});

router.put('/display/:display_id', async (req, res) => {

    console.log(req.params.display_id);

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "media") to retrieve the uploaded file
            let media = req.files.media;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            media.mv('./uploads/' + media.name);

            db.collection('displays').updateOne({ id: req.params.display_id }, { $addToSet: { media: media.name } }, function (err, result) {
                if (err) throw err;
                console.log("1 document updated");
            });


            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: media.name,
                    mimetype: media.mimetype,
                    size: media.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }


});


module.exports = router