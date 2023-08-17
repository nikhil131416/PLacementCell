const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.get('/', passport.checkAuthentication ,studentsController.students);
router.post('/create', passport.checkAuthentication ,studentsController.create);
router.get('/destroy', passport.checkAuthentication ,studentsController.destroy);
router.get('/update/:id', passport.checkAuthentication , studentsController.update);

module.exports = router;
