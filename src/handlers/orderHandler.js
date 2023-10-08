const createOrder = require("../controllers/OrderController/createOrder")
const getAllOrders = require("../controllers/OrderController/getAllOrders")
const getAllOrdersByUserId = require("../controllers/OrderController/getAllOrdersByUserId")


const createOrderHandler = async (req, res) => {
    try {
        const order = await createOrder(req.body)
        res.status(201).json(order)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getAllOrdersByUserIdHandler = async (req, res) => {
    try {
        const userOrders = await getAllOrdersByUserId(req.params)
        res.status(200).json(userOrders)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getAllOrdersHandler = async (req, res) => {
    try {
        const allOrders = await getAllOrders()
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createOrderHandler,
    getAllOrdersByUserIdHandler,
    getAllOrdersHandler
}