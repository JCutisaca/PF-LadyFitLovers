const { Router } = require('express')
const { createOrderHandler, successHandler, webhookHandler, updateStockHandler } = require('../handlers/paymentHandler')


const paymentRouter = Router()

paymentRouter.post("/createOrder", createOrderHandler)
paymentRouter.get("/success", successHandler)
// paymentRouter.post("/success", updateStockHandler)
paymentRouter.post("/webhook", webhookHandler)


module.exports = paymentRouter;