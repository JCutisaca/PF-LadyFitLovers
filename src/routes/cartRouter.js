const { Router } = require('express');
const { cleanProductsCartHandler, postProductsCartHandler, getCartByUserIdHandler } = require('../handlers/cartHandler');
const verifyToken = require('../middlewares/verifyToken');

const cartRouter = Router();

cartRouter.put("/clean", verifyToken, cleanProductsCartHandler)
cartRouter.put("/add", verifyToken, postProductsCartHandler)
cartRouter.get("/user/:userId", verifyToken, getCartByUserIdHandler)

module.exports = cartRouter;