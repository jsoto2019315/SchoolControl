const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { existentEmail, existentStudentById } = require('../helpers/db-validators');

const { studentPost, studentPut } = require('../controllers/student-controller');

const router = Router();

router.post(
    "/",
    [
        check("names", "Required name").not().isEmpty(),
        check("email", "This isn't a valid email").isEmail(),
        check("email").custom(existentEmail),
        check("password", "Password must have 5 characters").isLength({ min: 5, }),
        validateFields,
    ], studentPost
)


module.exports = router;