const { Router } = require('express')
const { createOrderHandler, successHandler, webhookHandler, updateStockHandler, failureHandler, pendingHandler } = require('../handlers/paymentHandler')


const paymentRouter = Router()

paymentRouter.post("/createOrder", createOrderHandler)
paymentRouter.get("/success", successHandler)
paymentRouter.get("/pending", pendingHandler)
paymentRouter.get("/failure", failureHandler)
paymentRouter.post("/webhook", webhookHandler)


module.exports = paymentRouter;