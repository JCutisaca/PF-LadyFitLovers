const { Router } = require('express');
const { createOrderHandler, getAllOrdersByUserIdHandler, getAllOrdersHandler } = require('../handlers/orderHandler');

const orderRouter = Router();

orderRouter.post("/create", createOrderHandler)
orderRouter.get("/allOrders", getAllOrdersHandler)
orderRouter.get("/user/:userId", getAllOrdersByUserIdHandler)

module.exports = orderRouter;