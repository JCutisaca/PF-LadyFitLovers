const { getProduct } = require("../controllers/ProductController/getProduct")
const { getProductById } = require("../controllers/ProductController/getProductById")
const { createProduct } = require("../controllers/ProductController/postProduct")

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

module.exports = {
    postProductHandler,
    getProductHandler,
    getProductByIdHandler
}