const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler, getProductFilterHandler, updateProductHandler, getProductByNameHandler, getAllCategoriesHandler, updateCategoryNameHandler } = require("../handlers/productHandler");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const productRouter = Router()

productRouter.post("/category", postCategoryHandler)
productRouter.get("/allCategories", getAllCategoriesHandler)
productRouter.put("/updateCategory", verifyTokenAdmin, updateCategoryNameHandler)

productRouter.post("/create", verifyTokenAdmin, postProductHandler)
productRouter.get("/allProducts", getProductHandler)
productRouter.get("/filter", getProductFilterHandler)
productRouter.get("/name", getProductByNameHandler)
productRouter.put("/update", verifyTokenAdmin, updateProductHandler)
productRouter.get("/:id", getProductByIdHandler)
productRouter.delete("/delete/:id", verifyTokenAdmin, deleteProductHandler)


module.exports = productRouter