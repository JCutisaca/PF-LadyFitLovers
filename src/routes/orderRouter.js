const { Router } = require('express');
const { createOrderHandler, getAllOrdersByUserIdHandler } = require('../handlers/orderHandler');

const orderRouter = Router();

orderRouter.post("/create", createOrderHandler)
orderRouter.get("/user/:userId", getAllOrdersByUserIdHandler)

module.exports = orderRouter;