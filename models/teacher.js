const { Schema, model } = require('mongoose');

const TeacherSchema = Schema({
    names: {
        type: String,
        required: [true, 'Required field']
    },
    email: {
        type: String,
        required: [true, 'Required field']
    },
    password: {
        type: String,
        required: [true, 'Required field']
    },
    subject:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ],
    role: {
        type: String,
        required: true,
        default: "“TEACHER_ROLE”"
    },
    status: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Teacher', TeacherSchema)