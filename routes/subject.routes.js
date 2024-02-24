const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { subjectPost } = require('../controllers/subject-controller');


const router = Router();

router.post(
    "/",
    [
        check("subjectName", "Required name").not().isEmpty(),
        validateFields,
    ], subjectPost
)

module.exports = router;