const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').extractJwt;

const jwtOptions = {
    jwtFromRequest: extractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create jwt strategy
const jwtLogin = new Strategy(jwtOptions, function (payload, done) {
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