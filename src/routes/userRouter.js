const { Router } = require("express");
const { postUserHandler } = require("../handlers/userHandler");
const userRouter = Router()

userRouter.post("/", postUserHandler)

module.exports = userRouter