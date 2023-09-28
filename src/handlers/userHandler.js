const postUser = require("../controllers/postUser");


const postUserHandler = async (req, res) => {
    try {
        const {name, surname, email, phone, password, address, typeUser} = req.body;
        const user = await postUser(name, surname, email, phone, password, address, typeUser);
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postUserHandler
}