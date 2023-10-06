const { Router } = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const paymentRouter = require('./paymentRouter');
const purchaseHistoryRouter = require('./purchaseHistoryRouter');

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/purchase", purchaseHistoryRouter)
router.use("/payment", paymentRouter)

module.exports = router;
