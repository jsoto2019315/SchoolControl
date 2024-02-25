const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await Student.findOne({_id: uid});
        console.log('')
        console.log('Log Student.findOne. Msg: I cant pass to Teacher validation')
        if (!user) {
            user = await Teacher.findOne({_id: uid});
        }

        if (!user) {
            return res.status(400).json({
                msg: 'Does not exists'
            }); 
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