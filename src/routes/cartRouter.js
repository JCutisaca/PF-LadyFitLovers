const { Router } = require('express');
const { cleanProductsCartHandler, postProductsCartHandler, getCartByUserIdHandler } = require('../handlers/cartHandler');

const cartRouter = Router();

cartRouter.put("/clean", cleanProductsCartHandler)
cartRouter.put("/add", postProductsCartHandler)
cartRouter.put("/user", getCartByUserIdHandler)

module.exports = cartRouter;