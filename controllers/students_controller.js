const Student = require('../models/student');
const Interview = require('../models/interview');


// rendering add student/update student page 
module.exports.students = async function(req, res){
    if(req.query.id){
        let student = await Student.findById(req.query.id);
        return res.render('student', {
            title: "Placement Portal| Student",
            student: student,
        });
    }

    return res.render('student', {
        title: "Placement Portal| Student",
        student: null,
    });
}


//creating a student in db
module.exports.create = async function(req, res){

    try {
        let student = await Student.findOne({email: req.body.email});
        
        if (student) {
            console.log('Student already exists');
            //Update Student
            await student.updateOne({
                name: req.body.name,
                email: req.body.email,
                batch: req.body.batch,
                college: req.body.college,
                status: req.body.status,
                dsa_score: req.body.dsa_score,
                webd_score: req.body.webd_score,
                react_score: req.body.react_score,
            })

            req.flash('success', 'Student updated');
            return res.redirect('/');
        }

        student = await Student.create({
            name: req.body.name,
            email: req.body.email,
            batch: req.body.batch,
            college: req.body.college,
            status: req.body.status,
            dsa_score: req.body.dsa_score,
            webd_score: req.body.webd_score,
            react_score: req.body.react_score,
        });

        if (student) {
            req.flash('success', 'Student created');
            return res.redirect('/')
        }
        else{
            req.flash('error', 'Error in creating student');
            console.log('Error in creating student');
            return;
        }
    } 
    catch (err) {
        req.flash('error', 'Error in creating student');
        console.log('Error', err);
        return;
    }
}


//removing a student from db
module.exports.destroy = async function(req, res){
    try {
        let student = await Student.findById(req.query.id);

        if (student) {

            for(let i=0; i<student.interviews.length; i++){
                let interview = await Interview.findById(student.interviews[i]);
                if(interview){
                    for(let j=0; j<interview.students.length; j++){
                        if(interview.students[j] == req.query.id){
                            interview.students.splice(j, 1);
                            break;
                        }
                    }
                }
            }

            student.deleteOne();
            // console.log('Student deleted');
            req.flash('success', 'Student deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Error in deleting student');
            console.log('Error in deleting student');
            return;
        }
    } 
    catch (err) {
        req.flash('error', 'Error in deleting student');
        console.log('Error', err);
        return;
    }
}


//update student info
module.exports.update = async function(req, res){

    try{
        let student = await Student.findById(req.params.id); 
        return res.render('update-student', {
            title: "Placement Portal| Update Student",
            student: student,
        });
    }
    catch(err){
        console.log(err);
        return;
    }
}