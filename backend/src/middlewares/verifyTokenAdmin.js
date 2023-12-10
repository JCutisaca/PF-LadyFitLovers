const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { User } = require('../db')

const verifyTokenAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(500).json({ error: "Authorization header is required." })
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(404).json("JWT token not found in the Authorization header.")
        const tokenVerified = await jwt.verify(token, JWT_SECRET)
        const findUser = await User.findOne({ where: { id: tokenVerified.id } })
        if(findUser.typeUser !== "Admin") throw Error("Access denied. Only administrators are allowed to access this resource.")
        req.user = tokenVerified.id
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = verifyTokenAdmin;