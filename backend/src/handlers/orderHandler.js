const createOrder = require("../controllers/OrderController/createOrder")
const getAllOrders = require("../controllers/OrderController/getAllOrders")
const getAllOrdersByUserId = require("../controllers/OrderController/getAllOrdersByUserId")
const getOrderById = require("../controllers/OrderController/getOrderById")
const updateOrderById = require("../controllers/OrderController/updateOrderById")


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

const updateOrderByIdHandler = async (req, res) => {
    try {
        const orderUpdate = await updateOrderById(req.body)
        res.status(200).json(orderUpdate)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getOrderByIdHandler = async (req, res) => {
    try {
        const order = await getOrderById(req.params)
        res.status(200).json(order)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createOrderHandler,
    getAllOrdersByUserIdHandler,
    getAllOrdersHandler,
    updateOrderByIdHandler,
    getOrderByIdHandler
}