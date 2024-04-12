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

const clientid = process.env.CLIENT_ID
const clientsecret = process.env.CLIENT_SECRET


mongoose.connect(process.env.MONGODB_URI, { dbName: "Capstone", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.error("MongoDb connection error:", err));

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:process.env. SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/home",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})

// / // Function to generate JWT token
function generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

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
app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})

