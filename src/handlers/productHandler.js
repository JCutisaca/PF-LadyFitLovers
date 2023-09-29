const { getProduct } = require("../controllers/ProductController/getProduct")
const { getProductById } = require("../controllers/ProductController/getProductById")
const { createProduct } = require("../controllers/ProductController/postProduct")
const { deleteProduct } = require("../controllers/ProductController/deleteProduct")
const postCategory = require("../controllers/ProductController/postCategory")

const postProductHandler = async(req, res) => {
    try {
        const product = await createProduct(req.body)
        res.status(201).json({product})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

const getProductHandler = async(req, res) => {
    try {
        const allProduct = await getProduct()
        res.status(201).json(allProduct)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

const getProductByIdHandler = async(req, res) => {
    try {

        const productById = await getProductById(req.params)
        res.status(201).json(productById)

    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}
const deleteProductHandler = async (req,res) => {
    try {
        const { id } = req.params
        const deleted = await deleteProduct(+id)
        
        res.status(200).send("Product  has deleted💥💥")
    } catch (error) {
        res.status(400).json({error: error.message})   
    }
}

const postCategoryHandler = async (req, res) => {
    try {
        const newCategory = await postCategory(req.body)
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postProductHandler,
    getProductHandler,
    getProductByIdHandler,
    deleteProductHandler,
    postCategoryHandler
}