const Student = require('../models/student');

const existentEmail = async (email = '') => {
    const existentEmail = await Student.findOne({ email });
    if (existentEmail) {
        throw new Error(`Email ${email} already registered`);
    }
}

const existentStudentById = async (id = '') => {
    const existentStudent = await Student.findOne({ id })
    if (existentStudent) {
        throw new Error(`Student with id ${id} doesn't exists`)
    }
}

module.exports = {
    existentEmail,
    existentStudentById
}