const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token, please log in to generate one'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const student = await Student.findOne({_id: uid});
        const teacher = await Teacher.findOne({_id: uid});
        let user, userType;
        if (student) {
            user = student;
            userType = 'student';
        } else {
            user = teacher;
            userType = 'teacher';
        }
        
        if (!user.status) {
            return res.status(400).json({
                msg: 'Token is valid, but user has a false status'
            })
        }
        
        req.user=user;
        next();
    } catch (e) {
        console.log('Mistake creating the token');
        console.log(e);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}

module.exports={
    validateJWT
}