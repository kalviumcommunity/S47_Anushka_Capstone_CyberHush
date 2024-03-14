const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Fullname: { 
        type: String, 
        required: true 
    },
    Username: { 
        type: String, 
        required: true
     },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    Password: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true
     },
    gender: {
         type: String,
          required: true 
        },
    location: {
         type: String, 
         required: true 
        },
    profilePic: {
         type: String 
        },
});

module.exports = mongoose.model("Registration", Schema)