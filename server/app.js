// Ensure that all required dependencies are imported
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Registration = require('./models/Schema');
const { registrationSchema, loginSchema } = require('./models/UserValidator');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: "Capstone", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.error("MongoDb connection error:", err));

// Function to generate JWT token
function generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

app.post('/registration', async (req, res) => {
    try {
        const { error } = registrationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { Firstname, Lastname, Email, Password, age, gender } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newRegistration = new Registration({
            Firstname, Lastname, Email, Password: hashedPassword, age, gender
        });
        const savedRegistration = await newRegistration.save();
        const token = generateToken(savedRegistration);
        res.send({ user: savedRegistration, token });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { Email, Password } = req.body;
        const user = await Registration.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user); 
        res.json({ user, token }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in token verification:", error);
        res.status(400).json({ message: 'Invalid token.' });
    }
}

app.get('/data', verifyToken, async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json({ data: registrations });
    } catch (error) {
        console.error("Error in fetching data:", error);
        res.status(500).json({ message: error.message });
    }
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
