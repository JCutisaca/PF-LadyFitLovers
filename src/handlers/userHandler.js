const postUser = require("../controllers/postUser");


const postUserHandler = async (req, res) => {
    try {
        const user = await postUser(req.body);
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postUserHandler
}