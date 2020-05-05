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

