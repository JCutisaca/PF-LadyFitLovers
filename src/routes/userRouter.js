const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler } = require("../handlers/userHandler");
const userRouter = Router()

userRouter.post("/create", postUserHandler)
userRouter.get("/", getUserHandler)
userRouter.get("/:id", getUserByIDHandler)
userRouter.delete("/:id", deleteUserHandler)

module.exports = userRouter