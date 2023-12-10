const { Router } = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const paymentRouter = require('./paymentRouter');
const favoriteRouter = require('./favoriteRouter');
const reviewRouter = require('./reviewRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/payment", paymentRouter)
router.use("/favorite", favoriteRouter)
router.use("/review", reviewRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)

module.exports = router;
