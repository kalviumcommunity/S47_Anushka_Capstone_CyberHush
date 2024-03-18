const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Firstname: { 
        type: String, 
        required: true 
    },
    Lastname: { 
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
        }
});

module.exports = mongoose.model("Registration", Schema)