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

const studentPut = async(req, res) => {
    
}

module.exports = {
    studentPost
}