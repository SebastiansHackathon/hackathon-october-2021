var express = require('express')
var router = express.Router()

var mongodbutil = require('../../../utils/mongo');
var db = mongodbutil.getDb();

router.get('/display/:display_id', function (req, res) {

    console.log(req.params.display_id);

    db.collection('displays').findOne({ id: req.params.display_id }, { projection: { history: 0 } }, function (err, result) {
        if (err) throw err;



        console.log(result);

        var mocked_data = {
            url_webcam: "https://www.unterstell.it/webcam/unterstell3.jpg",
            place_webcam: "Unterstell",
            meteo: {
                "smetadata": {
                    "name_de": "Bozen Marconistraße-Dantestraße",
                    "name_en": "Bozen Marconistraße-Dantestraße",
                    "name_it": "Bolzano via Marconi-via Dante"
                },
                temperature: "25.3",
                humidity: "30%",
                pressure: "20",
                wind_speed: "0.4",
            }
        }

        data_return = {
            result,
            mocked_data
        }

        res.send(data_return);

    });

})

router.get('/statistics/:display_id', function (req, res) {

    db.collection('displays').find({ id: req.params.display_id }, { projection: { history: 1 } }).toArray(function (err, result) {
        console.log(result)

        res.send(result);
    });

});

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