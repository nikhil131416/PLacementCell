const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');

router.get('/', passport.checkAuthentication ,homeController.home);
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));
router.use('/csv', require('./csv'));
router.use('/jobs', require('./jobs'));

module.exports = router;