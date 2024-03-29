require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Registration = require('./models/Schema'); 
const { registrationSchema, loginSchema } = require('./models/UserValidator');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: "Capstone"})
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.error("MongoDb connection error:", err));

app.post('/registration', async (req, res) => {
    try {
        const { error } = registrationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { Firstname, Lastname, Email, Password, age, gender } = req.body;
         // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newRegistration = new Registration({ 
            Firstname, Lastname, Email, Password: hashedPassword, age, gender
        });
        const savedRegistration = await newRegistration.save();
        res.send(savedRegistration);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { Email, Password } = req.body;
        // Find user by email

        const user = await Registration.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
