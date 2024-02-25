const { Router } = require("express");
const { login } = require('../controllers/login-controller');
const { check } = require("express-validator");
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/login',
    [
        check('email', 'This is not a valid email').isEmail(),
        check('password', 'Password is required'),
        validateFields
    ], login
);

module.exports = router;