const { deleteUser } = require("../controllers/UserController/deleteUser");
const { getUser } = require("../controllers/UserController/getUser");
const { postUser } = require("../controllers/UserController/postUser");
const { updateUser } = require("../controllers/UserController/updateUser");
const { passwordRecovery } = require("../controllers/UserController/passwordRecovery");
const { updatePassword } = require("../controllers/UserController/updatePassword")
const loginUser = require("../controllers/UserController/loginUser");
const getUserByID = require("../controllers/UserController/getUserById");
const userLoginGoogle = require("../controllers/UserController/userLoginGoogle");
const userLoginFacebook = require("../controllers/UserController/userLoginFacebook");

const postUserHandler = async (req, res) => {
    try {
        const user = await postUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUserHandler = async (req, res) => {
    try {
        const user = await loginUser(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const userLoginGoogleHandler = async (req, res) => {
    try {
        const user = await userLoginGoogle(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const userLoginFacebookHandler = async (req, res) => {
    try {
        const user = await userLoginFacebook(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserHandler = async (req, res) => {
    try {
        const allUser = await getUser()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserByIDHandler = async (req, res) => {
    try {
        const userById = await getUserByID(req.params)
        res.status(200).json(userById)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);

        res.status(200).send("User  has deleted💥💥")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateUserHandler = async (req, res) => {
    try {
        const user = await updateUser(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const userPasswordRecovery = async (req, res) => {
    try {
        const createOrCheckRecoveryCode = await passwordRecovery(req.body)
        res.status(200).json({success: true})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
}


const updateUserPassword= async (req,res) => {
    try {
        const newPassword = updatePassword(req.body);
        res.status(200).json({success:true}) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    postUserHandler,
    getUserHandler,
    getUserByIDHandler,
    deleteUserHandler,
    updateUserHandler,
    loginUserHandler,
    userLoginGoogleHandler,
    userPasswordRecovery,
    updateUserPassword,
    userLoginFacebookHandler
}