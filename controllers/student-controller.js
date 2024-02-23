const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Student = require('../models/student');

const studentPost = async (req, res) => {
    const { names, email, password } = req.body;
    const student = new Student({ names, email, password });

    const salt = bcryptjs.genSaltSync();
    student.password = bcryptjs.hashSync(password, salt);

    await student.save();
    res.status(200).json({
        student
    });

}


module.exports={
    studentPost
}