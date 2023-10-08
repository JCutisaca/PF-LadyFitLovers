const createOrder = require("../controllers/OrderController/createOrder")


const createOrderHandler = async (req, res) => {
    try {
        const order = await createOrder(req.body)
        res.status(201).json(order)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    createOrderHandler
}