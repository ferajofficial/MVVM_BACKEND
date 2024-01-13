
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
    name: 
    {
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true
    },
    password: 
    {
        type: String,
        required: true,
        length: {min:8}
    },
    phone: 
    {
        type: String,
        required: true,
        length: {min: 10}

    },
    
});
// Create a User model based on the schema
const User = mongoose.model("User", userSchema);
module.exports = User;