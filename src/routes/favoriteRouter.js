const { Router } = require('express');
const { addProductFavHandler, removeProductFavHandler, getFavByUserHandler } = require('../handlers/favoriteHandler');


const favoriteRouter = Router()

favoriteRouter.post("/add", addProductFavHandler)
favoriteRouter.put("/remove", removeProductFavHandler)
favoriteRouter.get("/:id", getFavByUserHandler)


module.exports = favoriteRouter;