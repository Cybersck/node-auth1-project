var express = require('express');
var router = express.Router();
var userMiddle = require('../middleware/userMiddle');
var userController = require('../controllers/userController');

/* GET users listing. */
router.post('/register', userMiddle.validateLogin, userController.register);
router.post('/login', userMiddle.validateLogin, userController.auth);
router.get('/', userMiddle.validateAuth, userController.getUsers);
module.exports = router;
