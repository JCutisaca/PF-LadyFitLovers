const { Router } = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const { UUIDV1 } = require('sequelize');
const cartRouter = require('./cartRouter');

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/cart", cartRouter)

module.exports = router;
