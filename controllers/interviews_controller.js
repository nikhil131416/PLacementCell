const Interview = require('../models/interview');
const Student = require('../models/student');

// render add interview page
module.exports.interviews = function(req, res){
    return res.render('interview', {
        title: "Placement Portal| Interview",
    });
}   


// creating a interview in db
module.exports.create = async function(req, res){
    try{
        let interview = await Interview.create({
            company: req.body.company,
            date: req.body.date,
        });

        if(interview){
            // console.log('Interview created');
            req.flash('success', 'Interview created');
            return res.redirect('/');
        }
        else{
            req.flash('error', 'Error in creating interview');
            return res.redirect('back');
        }
    }
    catch(err){
        // console.log('Error', err);
        req.flash('error', 'Error in creating interview');
        return res.redirect('back');
    }
}


//deleting a interview from db
module.exports.destroy = async function(req, res){

    try{
        let interview = await Interview.findById(req.query.id);

        if(interview){
            
            for(let i=0; i<interview.students.length; i++){
                let student = await Student.findById(interview.students[i].student);
                if(student){
                    for(let j=0; j<student.interviews.length; j++){
                        if(student.interviews[j].company == req.query.id){
                            student.interviews.splice(j, 1);
                            student.save();
                            break;
                        }
                    }
                }
            }


            interview.deleteOne();
            // console.log('Interview deleted');
            req.flash('success', 'Interview deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Error in deleting interview');
            console.log('Error in deleting interview');
            return;
        }
    }
    catch(err){
        req.flash('error', 'Error in deleting interview');
        console.log('Error', err);
        return;
    }
}


//alloting a student to the interview
module.exports.addStudent = async function(req, res){
    try{
        let interview = await Interview.findById(req.params.id);
        let email = req.body.email;
        let student = await Student.findOne({email: email});


        if(interview && student){
            
            let obj1 = {
                student: student._id,
                result: req.body.result,
            }

            let obj2 = {
                company: interview._id,
                result: req.body.result,
            }

            //TOdo if student is already enrolled in interview
            for(let i=0; i<interview.students.length; i++){
                if(interview.students[i].student.equals(student._id)){
                    interview.students.splice(i, 1);
                    await interview.save();
                }
            }

            for(let i=0; i<student.interviews.length; i++){
                if(student.interviews[i].company.equals(interview._id)){
                    student.interviews.splice(i, 1);
                    await student.save();
                }
            }
            

            interview.students.push(obj1);
            student.interviews.push(obj2);
            interview.save();
            student.save();

            // console.log('Student Assigned to interview');    
            req.flash('success', 'Student Assigned to interview');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Error in adding student to interview');
            console.log('Error in adding student to interview');
            return;
        }
    }
    catch(err){
        req.flash('error', 'Error in adding student to interview');
        console.log('Error', err);
        return;
    }
}


//removing a student from interview
module.exports.removeStudent = async function(req, res){
    try{
        let student = await Student.findById(req.params.studentId);
        let interview = await Interview.findById(req.params.interviewId);

        if(student && interview){
            
            for(let i=0; i<student.interviews.length; i++){
                if(student.interviews[i].company.equals(interview._id)){
                    student.interviews.splice(i, 1);
                    await student.save();
                }
            }

            for(let i=0; i<interview.students.length; i++){
                if(interview.students[i].student.equals(student._id)){
                    interview.students.splice(i, 1);
                    await interview.save();
                }
            }
            
            req.flash('success', 'Student removed from interview');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Error in removing student from interview');
            console.log('Error in removing student from interview');
            return;
        }
    }
    catch(err){
        req.flash('error', 'Error in removing student from interview');
        console.log('Error', err);
        return;
    }
}