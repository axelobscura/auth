const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Setupr passport local startegy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    // Verify email and password
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(ewrr); }
        if (!user) { return done(null, false); }
    })
})

//Create jwt strategy
const jwtLogin = new JwtStategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false) };
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

passport.use(jwtLogin);