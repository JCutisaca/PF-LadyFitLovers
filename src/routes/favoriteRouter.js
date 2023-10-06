const { Router } = require('express');
const { addProductFavHandler, removeProductFavHandler } = require('../handlers/favoriteHandler');


const favoriteRouter = Router()

favoriteRouter.post("/add", addProductFavHandler)
favoriteRouter.delete("/remove", removeProductFavHandler)


module.exports = favoriteRouter;