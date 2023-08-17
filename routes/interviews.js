const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewsController = require('../controllers/interviews_controller');

router.get('/', passport.checkAuthentication ,interviewsController.interviews);
router.post('/create', passport.checkAuthentication ,interviewsController.create);
router.get('/destroy', passport.checkAuthentication ,interviewsController.destroy);
router.post('/add-student/:id', passport.checkAuthentication ,interviewsController.addStudent);
router.get('/remove-student/:studentId/:interviewId', passport.checkAuthentication ,interviewsController.removeStudent);


module.exports = router;