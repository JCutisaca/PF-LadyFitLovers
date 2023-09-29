const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler } = require("../handlers/productHandler");
const productRouter = Router()

productRouter.post("/create", postProductHandler)
productRouter.get("/", getProductHandler)
productRouter.get("/:id", getProductByIdHandler)
productRouter.delete("/:id", deleteProductHandler)

productRouter.post("/category", postCategoryHandler)

module.exports = productRouter