const { Router } = require('express');
const { createOrderHandler, getAllOrdersByUserIdHandler, getAllOrdersHandler, updateOrderByIdHandler, getOrderByIdHandler } = require('../handlers/orderHandler');

const orderRouter = Router();

orderRouter.post("/create", createOrderHandler)
orderRouter.get("/allOrders", getAllOrdersHandler) // ruta solo admin
orderRouter.put("/update", updateOrderByIdHandler)
orderRouter.get("/id/:id", getOrderByIdHandler)
orderRouter.get("/user/:userId", getAllOrdersByUserIdHandler)

module.exports = orderRouter;