const { Router } = require('express');
const { createOrderHandler, getAllOrdersByUserIdHandler, getAllOrdersHandler, updateOrderByIdHandler } = require('../handlers/orderHandler');

const orderRouter = Router();

orderRouter.post("/create", createOrderHandler)
orderRouter.get("/allOrders", getAllOrdersHandler)
orderRouter.put("/update", updateOrderByIdHandler)
orderRouter.get("/user/:userId", getAllOrdersByUserIdHandler)

module.exports = orderRouter;