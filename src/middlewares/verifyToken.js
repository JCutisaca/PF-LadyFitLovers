const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { User } = require('../db')

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(500).json({ error: "Authorization header is required." })
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(404).json("JWT token not found in the Authorization header.")
        const tokenVerified = await jwt.verify(token, JWT_SECRET)
        // console.log(tokenVerified); // puedo obtener el id del usuario
        // console.log(req.params);
        // console.log(!Object.keys(req.body).length);
        req.user = tokenVerified.id
        // const findUser = await User.findOne()
            next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = verifyToken;