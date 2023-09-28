const { Router } = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const { UUIDV1 } = require('sequelize');

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)

module.exports = router;
