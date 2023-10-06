const addProductFav = require("../controllers/FavController/addProductFav")
const getFavByUser = require("../controllers/FavController/getFavByUser")
const removeProductFav = require("../controllers/FavController/removeProductFav")


const addProductFavHandler = async (req, res) => {
    try {
     
        const fav = await addProductFav(req.body)
        res.status(201).json(fav)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const removeProductFavHandler = async (req, res) => {
    try {
        const remove = await removeProductFav(req.body)
        res.status(200).json(remove)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getFavByUserHandler = async (req, res) => {
    try {
     
        const fav = await getFavByUser(req.params)
        res.status(201).json(fav)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    addProductFavHandler,
    removeProductFavHandler,
    getFavByUserHandler
}