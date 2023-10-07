const { Router } = require('express');
const { cleanProductsCartHandler, postProductsCartHandler, getCartByUserIdHandler } = require('../handlers/cartHandler');

const cartRouter = Router();

cartRouter.put("/clean", cleanProductsCartHandler)
cartRouter.put("/add", postProductsCartHandler)
cartRouter.get("/user/:userId", getCartByUserIdHandler)

module.exports = cartRouter;