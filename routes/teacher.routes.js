const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { existentTeacherEmail } = require('../helpers/db-validators');
const { teacherPost } = require('../controllers/teacher-controller');

const router = Router();

router.post(
    "/",
    [
        check("names", "Required name").not().isEmpty(),
        check("email", "This isn't a valid email").isEmail(),
        check("email").custom(existentTeacherEmail),
        check("password", "Password must have 5 characters").isLength({ min: 5, }),
        validateFields,
    ], teacherPost
)

module.exports = router;