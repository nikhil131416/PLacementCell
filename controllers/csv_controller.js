const fs = require("fs");
const path = require("path");
const Student = require("../models/student");

module.exports.export = async function (req, res) {
  try {
    const allStudents = await Student.find({}).populate('interviews.company interviews.result');

    let report = "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
    let studentData1 = "";

    for (let student of allStudents) {
      studentData1 =
        student.id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.status +
        "," +
        student.dsa_score +
        "," +
        student.webd_score +
        "," +
        student.react_score;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          let studentData2 = "";
          studentData2 +=
            "," +
            correctDate(interview.company.date) +
            "," +
            interview.company.company +
            "," +
            interview.result;
            
            report += "\n" + studentData1 + studentData2;
        }
      }
      else{
        report += "\n" + studentData1;
      }
    }
    
    const csvFile = fs.writeFile(
      "uploads/studentsReport.csv",
      report,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirect("back");
        }
        return res.download("uploads/studentsReport.csv");
      }
    );

  } catch (err) {
    console.log(err);
  }
};


let correctDate = (input) => {
    const dateObject = new Date((input).toString());
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    
    const formattedDate = `${month} ${day} ${year}`;
    
    return formattedDate;
}