// Main starting point
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup
//mongoose.connect('mongodb+srv://axosar@admin:LjqhtCOj5b3BuiUa@cluster0-muwar.mongodb.net/test?retryWrites=true&w=majority')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://axosar@admin:LjqhtCOj5b3BuiUa@cluster0-muwar.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("auth").collection("users");
    //console.log(collection);
    client.close();
});

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port)