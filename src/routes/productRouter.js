const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler, getProductFilterHandler } = require("../handlers/productHandler");
const productRouter = Router()

productRouter.post("/create", postProductHandler)
productRouter.get("/", getProductHandler)
productRouter.get("/", getProductFilterHandler)
productRouter.get("/:id", getProductByIdHandler)
productRouter.delete("/:id", deleteProductHandler)

productRouter.post("/category", postCategoryHandler)

module.exports = productRouter