const { getUser } = require("../controllers/UserController/getUser");
const { getUSerByID } = require("../controllers/UserController/getUserById");
const { postUser } = require("../controllers/UserController/postUser");
const {deleteUser}= require("../controllers/UserController/deleteUser");
// const { updateProduct } = require("../controllers/ProductController/updateProduct");


const postUserHandler = async (req, res) => {
    try {
        const user = await postUser(req.body);
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUserHandler = async(req, res) => {
    try {
        const allUser = await getUser()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(400).json({error: error.message})      
    }
}

const getUserByIDHandler = async(req, res) => {
    try {
        const userById = await getUSerByID(req.params)
        res.status(200).json(userById)
    } catch (error) {
        res.status(400).json({error: error.message})    
    }
}
const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);

        res.status(200).send("User  has deleted💥💥")
    } catch (error) {
        res.status(400).json({error: error.message})   
    }
}

// const updateProductHandler = async (req, res) =>{
//     try {
//         const {name} = req.body
//         await updateProduct(req.params, name)
//     } catch (error) {
        
//     }
// } 

module.exports = {
    postUserHandler,
    getUserHandler,
    getUserByIDHandler,
    deleteUserHandler,
}