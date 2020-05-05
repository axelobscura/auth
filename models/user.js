const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// Create the model
const ModelClass = mongoose.model('user', userSchema);

// Export
module.exports = ModelClass;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://axosar@admin:LjqhtCOj5b3BuiUa@cluster0-muwar.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("auth").collection("users");
    // perform actions on the collection object
    client.close();
});
