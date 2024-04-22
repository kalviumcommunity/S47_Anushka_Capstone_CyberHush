require("dotenv").config(); 
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000; 
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./models/userSchema"); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const Registration = require('./models/Schema'); 
const { registrationSchema, loginSchema } = require('./models/UserValidator');
const report = require('./models/reportSchema');

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { dbName: "Capstone", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.error("MongoDb connection error:", err));

// Enable CORS middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json());

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth2 Strategy
passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userdb.findOne({ googleId: profile.id });

            if (!user) {
                user = new userdb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });

                await user.save();
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    })
);

// Serialize user object to session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user object from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Initial Google OAuth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback endpoint
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/login"
}));

// Route to check if user is logged in
app.get("/login/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

// Route to logout
app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("http://localhost:3000");
    });
});

// Function to generate JWT token
function generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Middleware to verify JWT token
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

// Route to fetch data (requires JWT token for authorization)
app.get('/data', verifyToken, async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json({ data: registrations });
    } catch (error) {
        console.error("Error in fetching data:", error);
        res.status(500).json({ message: error.message });
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

// Route for user registration
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

// Route to add a report
app.post('/addreport', async (req, res) => {
    try {
        const { error } = report.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { reportType, description, date, location, image, status } = req.body;
        const newReport = new report({
            reportType, description, date, location, image, status
        });
        const savedReport = await newReport.save();
        res.send({ user: savedReport });
    } catch (error) {
        console.error("Error in adding report:", error);
        res.status(500).send(error.message);
    }
});

// Route to update a report
app.put('/updatereport/:id', async (req, res) => {
    try {
        const { error } = report.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { reportType, description, date, location, image, status } = req.body;
        const updatedReport = await report.findByIdAndUpdate(req.params.id, {
            reportType, description, date, location, image, status
        }, { new: true });
        res.send({ user: updatedReport });
    } catch (error) {
        console.error("Error in updating report:", error);
        res.status(500).send(error.message);
    }
});

// Route to fetch reports
app.get('/report', async (req, res) => {
    try {
        const reports = await report.find();
        res.json({ data: reports });
    } catch (error) {
        console.error("Error in fetching reports:", error);
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

