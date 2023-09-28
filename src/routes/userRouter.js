const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler } = require("../handlers/userHandler");
const userRouter = Router()

userRouter.post("/", postUserHandler)
userRouter.get("/", getUserHandler)
userRouter.get("/:id", getUserByIDHandler)

module.exports = userRouter