const { Router } = require('express');
const { createOrderHandler, getAllOrdersByUserIdHandler, getAllOrdersHandler, updateOrderByIdHandler, getOrderByIdHandler } = require('../handlers/orderHandler');
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');
const verifyTokenParams = require('../middlewares/verifyTokenParams');

const orderRouter = Router();

orderRouter.post("/create",verifyToken, createOrderHandler)
orderRouter.get("/allOrders", verifyTokenAdmin, getAllOrdersHandler) // ruta solo admin
orderRouter.put("/update", verifyTokenAdmin, updateOrderByIdHandler)
orderRouter.get("/id/:id", verifyTokenAdmin, getOrderByIdHandler)
orderRouter.get("/user/:userId", verifyTokenParams, getAllOrdersByUserIdHandler)

module.exports = orderRouter;