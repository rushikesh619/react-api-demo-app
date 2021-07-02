const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
var cors = require('cors');
const bodyParser = require("body-parser");;

const Relationship = require("./models/relationship");
const config = require("./config");

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log("MongoDB connected!!!", config.db);
}).catch(err => {
    console.log("MongoDB connection failed!!!", err)
});

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({
    limit: "1000kb"
}));

const api = require("./apis/index");
api(app);
app.get('*.*', express.static(__dirname + '/ui/build', { maxAge: '1y' }));
// serve frontend paths
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, { root: __dirname + '/ui/build' });
});

const port = process.env.PORT || config.port;

app.listen(port, function (err) {
    if (err) {
        console.log("Error in server setup");
    }
    else {
        console.log("Server listening on Port", port);
    }
})