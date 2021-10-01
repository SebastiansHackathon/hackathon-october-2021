const express = require("express");
const bodyParser = require("body-parser");

const app = express();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./controllers"));

app.listen(3000, () => {
    console.log("Started on PORT 3000");
})