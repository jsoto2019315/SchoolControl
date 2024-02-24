const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Subject = require('../models/subject');

const subjectPost = async (req, res) => {
    console.log('');
    console.log('Log from subjectPost.Subject');
    try {
        const { subjectName } = req.body;
        const subject = new Subject({ subjectName });

        await subject.save();
        res.status(200).json({
            subject
        });

    } catch (e) {
        console.log('Mistake creating the subject');
        console.error(e) //Sirve para depurar el programa, al final ANTES DE ENVIARLO COMENTAR LA LINEA PARA QUE NO DE ERROR    
    }
}

module.exports = {
    subjectPost
}