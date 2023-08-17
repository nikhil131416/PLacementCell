const express = require('express');
const router = express.Router();
const passport = require('passport');

const csvController = require('../controllers/csv_controller');

router.get('/export', passport.checkAuthentication ,csvController.export);

module.exports = router;