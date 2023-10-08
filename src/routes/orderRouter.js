const { Router } = require('express');
const { createOrderHandler } = require('../handlers/orderHandler');

const orderRouter = Router();

orderRouter.post("/create", createOrderHandler)

module.exports = orderRouter;