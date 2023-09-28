const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler } = require("../handlers/productHandler");
const productRouter = Router()

productRouter.post("/", postProductHandler)
productRouter.get("/", getProductHandler)
productRouter.get("/:id", getProductByIdHandler)

module.exports = productRouter