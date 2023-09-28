const { Router } = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)

module.exports = router;