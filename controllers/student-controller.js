const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Student = require('../models/student');


const studentPost = async (req, res) => {
    console.log('');
    console.log('Log de studentPost.Student');
    try {
        const { names, email, password } = req.body;
        const student = new Student({ names, email, password });

        const salt = bcryptjs.genSaltSync();
        student.password = bcryptjs.hashSync(password, salt);

        await student.save();
        res.status(200).json({
            student
        });

    } catch (e) {
        console.log('Mistake creating the student');
        console.error(e) //Sirve para depurar el programa, al final ANTES DE ENVIARLO COMENTAR LA LINEA PARA QUE NO DE ERROR    
    }
}


const studentPut = async (req, res) => {
    const { id } = req.user;
    const { _id, names, email, password, role, status, ...rest } = req.body;

    const student = await Student.findByIdAndUpdate(id, rest);

    if (req.user.role != 'STUDENT_ROLE') {
        return res.status(400).json({
            msg: 'This is not a student'
        })
    }

    res.status(200).json({
        msg: 'Student updated successfully'
    });
}


const studentGetCourses = async (req, res) => {
    const { id } = req.user;
    try {
        const student = await Promise.all([
            Student.findOne({ _id: id })
                .populate('subject')
        ]);

        if (req.user.role != 'STUDENT_ROLE') {
            return res.status(400).json({
                msg: 'This is not a student'
            })
        }

        const formattedStudents = student.map(student => ({
            student: (`${student.names} has the next subjects assigned: ${student.subject.map(subject => subject.subjectName)}`),
            //subject: student.subject.map(subject => subject.subjectName)

        }));

        res.status(200).json({
            student: formattedStudents
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error trying to get student'
        })
    }
}

const editStudentProfile = async (req, res) => {
    const { id } = req.user;
    const { _id, subject, role, status, password, ...rest } = req.body;

    const student = await Student.findByIdAndUpdate(id, rest);

    if (req.user.role != 'STUDENT_ROLE') {
        return res.status(400).json({
            msg: 'This is not a student'
        })
    }

    res.status(200).json({
        msg: 'Student profile updated successfully'
    });
}

const deleteStudentProfile = async (req, res) => {
    const { id } = req.user;

    try {
        await Student.findByIdAndUpdate(id, { status: false });

        const student = await Student.findOne({ _id: id });

        if (req.user.role != 'STUDENT_ROLE') {
            return res.status(400).json({
                msg: 'This is not a student'
            })
        }

        res.status(200).json({
            msg: 'Student deleted'
        })
    } catch (e) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

module.exports = {
    studentPost,
    studentPut,
    studentGetCourses,
    editStudentProfile,
    deleteStudentProfile
}