const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h',
            },
            (err, token) => {
                err ? (console.log(err), reject('Token cannot be added')) : resolve(token)
            }
        )

    })
}

module.exports = {
    generateJWT
}