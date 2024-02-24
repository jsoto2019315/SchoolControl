const { Schema, model } = require('mongoose');

const SubjectSchema = Schema({
    subjectName: {
        type: String,
        required: [true, 'Required field']
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Subject', SubjectSchema);