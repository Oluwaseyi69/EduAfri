const express = require('express');
const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/Auth');

const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);




module.exports = router;
