const { Router } = require("express");
const { addItemHandler } = require("../handlers/cartHandler");
const cartRouter = Router()

cartRouter.post("/add/:idUser/:idProduct", addItemHandler)


module.exports = cartRouter