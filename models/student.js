const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    batch: {
        type : String,
        required : true
    },
    college: {
        type : String,
        required : true
    },
    status: {
        type : String,
        enum : ['placed', 'not placed'],
        required : true
    },
    dsa_score: {
        type : Number,
        required : true
    },
    webd_score: {
        type : Number,
        required : true
    },
    react_score: {
        type : Number,
        required : true
    },
    
    interviews: [
        {
          company: {
            type: mongoose.mongoose.Schema.Types.ObjectId,
            ref: "Interview",
          },
          result: {
            type: String,
            enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
          },
        },
    ],
}
,{timestamps: true});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;