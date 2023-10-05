const { Router } = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const paymentRouter = require('./paymentRouter');

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/cart", cartRouter)
router.use("/payment", paymentRouter)

module.exports = router;
