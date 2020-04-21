let bcrypt = require('bcryptjs');
let db = require('../data/userdb');

exports.auth = (req, res) => {
    db.login(req.user.username).then(user => {
        if (user.password !== undefined && bcrypt.compareSync(req.user.password, user.password)) {
            db.createSession(req.sessionID, req.session.cookie.maxAge)
            .then(res.status(200).send({message: 'Success', user: user, ssid: req.sessionID}))
            .catch(err => console.log(err));
        } else {
            res.status(200).send('Invalid Username or Password');
        }
    });

}

exports.register = (req, res) => {
    db.register(req.user).then(user => {
        if (user.username) {
        res.status(200).send('Success!')
    } else {
        res.status(400).send('Something went wrong!');
    }
    })
}

exports.getUsers = (req, res) => {
    db.getUsers().then(users => {
        res.status(200).send(users);
    })
}