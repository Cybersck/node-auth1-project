
let db = require('../data/userdb');
let bcrypt = require('bcryptjs');

exports.validateLogin = (req, res, next) => {
    if (req.body.username === undefined ||
        req.body.password === undefined) {
            res.status(400).send('Invalid Form. Missing Username or Password.');
    } else if (req.route.path === '/register') {
                req.user = {username: req.body.username, password: bcrypt.hashSync(req.body.password, 10)};
                next();
        } else {
            req.user = req.body;
            next();
        }
}

exports.validateAuth = (req, res, next) => {

    db.getSession(req.sessionID).then(session => {
        if (session === undefined) {
            res.status(404).send('Invalid Session Token, please sign in.');
        } else if (session.ttl + session.start < Date.now()) {
            res.status(400).send('Session Has Expired, please sign in again.');
    } else {
        next();
    }
})
}
