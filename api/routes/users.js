const express = require('express');
const router = express.Router();

const checkAuth = require('../middelware/check-auth');
const UserController = require('../controllers/users');

router.post("/signup", UserController.user_singup);

router.post('/login', UserController.user_login);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;