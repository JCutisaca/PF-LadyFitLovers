const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler, getProductFilterHandler, updateProductHandler, getProductByNameHandler } = require("../handlers/productHandler");
const productRouter = Router()

productRouter.post("/category", postCategoryHandler)

productRouter.post("/create", postProductHandler)
productRouter.get("/allProducts", getProductHandler)
productRouter.get("/filter", getProductFilterHandler)
productRouter.get("/name", getProductByNameHandler)
productRouter.put("/update/:id", updateProductHandler)
productRouter.get("/:id", getProductByIdHandler)
productRouter.delete("/delete/:id", deleteProductHandler)


module.exports = productRouter