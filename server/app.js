require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Registration = require('./Schema'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: "Capstone"})
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.error("MongoDb connection error:", err));


    app.post('/registration', async (req, res) => {
        try {
            const { Fullname, Username, Email, Password, age, gender, location, profilePic } = req.body;
            const newRegistration = new Registration({ 
                Fullname, Username, Email, Password, age, gender, location, profilePic
            });
            const savedRegistration = await newRegistration.save();
            res.send(savedRegistration);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
    
    app.get('/data', async (req, res) => {
        try {
            const registrations = await Registration.find();
            res.json({ data: registrations });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }); 
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

