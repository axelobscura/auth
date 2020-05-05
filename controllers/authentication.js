const User = require('../models/user');

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and a password' });
    }

    // see if a user does exist
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }
        // if email exists return error
        if (existingUser) {
            return res.status(422).send({ error: "Email in use" });
        };
        // if email/user does not exists
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) { return next(err) };

            // Respond to request
            res.json({ success: true });
        })



    });
}