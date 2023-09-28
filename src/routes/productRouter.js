const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler } = require("../handlers/productHandler");
const productRouter = Router()

productRouter.post("/", postProductHandler)
productRouter.get("/", getProductHandler)
productRouter.get("/:id", getProductByIdHandler)
productRouter.delete("/:id", deleteProductHandler)

module.exports = productRouter