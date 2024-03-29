const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Firstname: { 
        type: String
    },
    Lastname: { 
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    Password: { 
        type: String
    },
    age: { 
        type: Number
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.model("Registration", Schema);
