const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Subject = require('../models/subject');
const subject = require('../models/subject');


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
        console.error(e); //Recuerdate de comentar
    }
}

const existentTeacherById = async (id = '') => {
    const existentTeacherById = await Teacher.findOne({ id })
    if (existentTeacherById) {
        throw new Error(`Teacher with id ${id} doesn't exists`)
    }
}


//Assign Subject to Student
// const assignedSubjects = async (subjects = [], user) => {
//     if (user.role === "STUDENT_ROLE") {
//         if (subjects.length > 3) {
//             throw new Error("A student can only be assigned to a maximum of 3 subjects.");
//         }
//         const uniqueSubjects = new Set(subjects);
//         if (uniqueSubjects.size !== subjects.length) {
//             throw new Error("A student cannot be assigned to the same subject multiple times.");
//         }
//     }
//     return true;
// };
module.exports = {
    existentEmail,
    existentStudentById,
    existentTeacherEmail,
    existentTeacherById
}