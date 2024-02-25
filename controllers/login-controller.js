const { generateJWT } = require('../helpers/generate-jws');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        const teacher = await Teacher.findOne({ email });

        let user, userType;

        if (student) {
            user = student;
            userType = 'student';
        } else {
            user = teacher;
            userType = 'teacher';
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
            message: (`Welcome ${user.names}, you have the role ${user.role} `),
            token: (`Your token is ${token}`)
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Contact the admin'
        })
    }

}

// Assign Subjects to Student
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
    login
}