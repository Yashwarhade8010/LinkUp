require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
const googleStrategy = require('passport-google-oauth20').Strategy;

function oauthoSession(app){
    app.use(session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:true
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new googleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
    )

    passport.serializeUser((user, done) => {
        done(null, user);
      });
      
      passport.deserializeUser((obj, done) => {
        done(null, obj);
      });
}

module.exports = {
    oauthoSession
}