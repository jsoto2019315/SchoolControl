const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { existentEmail, existentStudentById, assignedSubjects, existentStudentName } = require('../helpers/db-validators');

const { studentPost, studentPut, studentGetCourses, editStudentProfile } = require('../controllers/student-controller');
const { validateJWT } = require('../middlewares/validate-jws');

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
);

router.put(
    "/",
    [
        validateJWT,
        check("subject").custom((value, { req }) => assignedSubjects(value, req)),
        validateFields,
    ], studentPut
);

router.get(
    "/",
    [
        validateJWT,
        validateFields
    ], studentGetCourses
);

router.put(
    "/editStudentProfile",
    [
        validateJWT,
        check("email", "This isn't a valid email").isEmail(),
        check("email").custom(existentEmail),
        validateFields
    ], editStudentProfile
)


module.exports = router;