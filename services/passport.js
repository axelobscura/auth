const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

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