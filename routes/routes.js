const express = require('express');
const {register, login, authenticate } = require('../controller/AuthController');
const { newProfile, profiles, profile, addWallet } = require('../controller/UserController');
const { validate } = require('../auth/jwt');
const router = express.Router();
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/authenticate', authenticate);
router.get('/auth/validate', validate);

router.post('/user/new-profile', newProfile);
router.get('/user/profiles', profiles);
router.post('/user/profile', profile);
router.post('/user/add-wallet', addWallet);

module.exports = router;