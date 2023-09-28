const { Router } = require('express');
const userRouter = require('./userRouter');

const router = Router()

router.use("/user", userRouter)

module.exports = router;