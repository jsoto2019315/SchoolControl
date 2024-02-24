const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Teacher = require('../models/teacher');


const teacherPost = async (req, res) => {
    console.log('');
    console.log('Log de teacherPost.Teacher');

    try {
        const { names, email, password } = req.body;
        const teacher = new Teacher({ names, email, password });

        const salt = bcryptjs.genSaltSync();
        teacher.password = bcryptjs.hashSync(password, salt);

        await teacher.save();
        res.status(200).json({
            teacher
        });
    } catch (e) {
        console.log('Mistake creating the teacher');
        console.error(e)
    }
}

module.exports = {
    teacherPost
}