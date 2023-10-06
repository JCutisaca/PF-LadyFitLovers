const addProductFav = require("../controllers/FavController/addProductFav")


const addProductFavHandler = async (req, res) => {
    try {
        const fav = await addProductFav(req.body)
        res.status(201).json(fav)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    addProductFavHandler
}