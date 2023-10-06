const getPurchaseHistoryByUserId = require("../controllers/PurchaseHistoryCotroller/getPurchaseHistoryByUserId")
const postProductsPurchase = require("../controllers/PurchaseHistoryCotroller/postProductsPurchase")



const postProductsPurchaseHandler = async (req, res) => {
    try {
        const products = await postProductsPurchase(req.body)
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getPurchaseHistoryByUserIdHandler = async (req, res) => {
    try {
        const cartUser = await getPurchaseHistoryByUserId(req.params)
        res.status(200).json(cartUser)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}



module.exports = {
    getPurchaseHistoryByUserIdHandler,
    postProductsPurchaseHandler
}