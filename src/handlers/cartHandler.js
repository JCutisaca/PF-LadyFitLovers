const cleanProductsCart = require("../controllers/CartController/cleanProductsCart")
const getCartByUserId = require("../controllers/CartController/getCartByUserId")
const postProductsCart = require("../controllers/CartController/postProdutcsCart")


const cleanProductsCartHandler = async (req, res) => {
    try {
        const cleanCart = await cleanProductsCart()
        res.status(200).json(cleanCart)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
const getCartByUserIdHandler = async (req, res) => {
    try {
        const cartUser = await getCartByUserId(req.body)
        return cartUser;
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
const postProductsCartHandler = async (req, res) => {
    try {
        const updateCart = await postProductsCart(req.body)
        res.status(200).json(updateCart)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    cleanProductsCartHandler,
    getCartByUserIdHandler,
    postProductsCartHandler
}