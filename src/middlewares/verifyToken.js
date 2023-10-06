const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(500).json({ error: "No tenes autorizacion mi rey" })
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(404).json("Amigo o enemigo????")
        const tokenVerified = await jwt.verify(token, JWT_SECRET)
        req.user = tokenVerified.id
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = verifyToken;