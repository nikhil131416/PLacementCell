const express = require('express');
const router = express.Router();
const passport = require('passport');

const jobsController = require('../controllers/jobs_controller');

router.get('/', passport.checkAuthentication , jobsController.home);

module.exports = router;