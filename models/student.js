const { Schema, model } = require('mongoose');

const StudentsSchema = Schema({
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
    subject: [
        {
            type: String,
            required: [true, 'Required field']
        }
    ],
    role: {
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"],
        default: "STUDENT_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Student', StudentsSchema);