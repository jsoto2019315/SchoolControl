const { generateJWT } = require('../helpers/generate-jws');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        //Search teacher or student
        const user = await Student.findOne({ email });

        console.log('')
        console.log('Log login-controller.findOne. Msg: I cant pick up a teacher')

        if (!user) {
            user = await Teacher.findOne({ email });
        }

        //Verify email
        if (!user) {
            return res.status(400).json({
                msg: 'Email does not registered'
            })
        }

        //Verify existing user
        if (!user.status) {
            return res.status(400).json({
                msg: 'User does not exists in DB'
            })
        }

        //Verify password
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Incorrect Password'
            })
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'Login success',
            user,
            token
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Contact the admin'
        })
    }

}

module.exports = {
    login
}