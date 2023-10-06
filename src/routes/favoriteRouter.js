const { Router } = require('express');
const { addProductFavHandler } = require('../handlers/favoriteHandler');


const favoriteRouter = Router()

favoriteRouter.post("/add", addProductFavHandler)


module.exports = favoriteRouter;