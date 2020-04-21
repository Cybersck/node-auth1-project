const db = require('./dbconfig');

module.exports = {
    register,
    login,
    getUsers,
    createSession,
    getSession
}

function getUsers() {
    return db('users');
}

function getById(id) {
    return db('users').where({id}).first();
}
function register(user) {
    return db('users').insert(user).then(ids => {
        return getById(ids[0]);
    });
}

function login(username) {
    return db('users').where('username', username).first().then(user => {
        return user;
    });
}

function createSession(ssid, ttl) {
    session = {ssid: ssid, ttl: ttl, start: Date.now()}
    return db('sessions').insert(session);
}

function getSession(ssid) {
    return db('sessions').where('ssid', ssid).first();
}