const { getUser } = require("../controllers/UserController/getUser");
const { getUSerByID } = require("../controllers/UserController/getUserById");
const postUser = require("../controllers/UserController/postUser");


const postUserHandler = async (req, res) => {
    try {
        const {name, surname, email, phone, password, address, typeUser} = req.body;
        const user = await postUser(name, surname, email, phone, password, address, typeUser);
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUserHandler = async(req, res) => {
    try {
        const allUser = await getUser()
        res.status(201).json(allUser)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

const getUserByIDHandler = async(req, res) => {
    try {

        const userBYId = await getUSerByID(req.params)
        res.status(201).json(userBYId)

    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}


module.exports = {
    postUserHandler,
    getUserHandler,
    getUserByIDHandler
}