const Student = require('../models/student');
const Teacher = require('../models/teacher');


// Student
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


//Teacher
const existentTeacherEmail = async (email = '') => {
    console.log('');
    console.log('Log from existentTeacherEmail.Teacher');

    try {
        const existentTeacherEmail = await Teacher.findOne({ email });
        if (existentTeacherEmail) {
            throw new Error(`Email ${email} already registered`);
        }
    } catch (e) {
        console.log('Mistake in the function');
        console.error(e);
    }
}

const existentTeacherById = async (id = '') => {
    const existentTeacherById = await Teacher.findOne({ id })
    if (existentTeacherById) {
        throw new Error(`Teacher with id ${id} doesn't exists`)
    }
}
module.exports = {
    existentEmail,
    existentStudentById,
    existentTeacherEmail,
    existentTeacherById
}