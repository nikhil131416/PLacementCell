const Student = require('../models/student');
const Interview = require('../models/interview');

//render homepage/dashboard with all students and interviews
module.exports.home = async function(req, res){
    try {
        let students = await Student.find({}).populate('interviews.company interviews.result');
        let interviews = await Interview.find({}).populate('students.student students.result');
        
        return res.render('home', {
            title: "Placement Portal| Dashboard",
            students: students,
            interviews: interviews
        });
    } 
    catch (err) {
        console.log('Error', err);
        return;
    }
}
