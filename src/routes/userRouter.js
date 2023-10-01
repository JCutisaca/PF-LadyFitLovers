const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler, updateUserHandler, loginUserHandler } = require("../handlers/userHandler");
const userRouter = Router()

userRouter.post("/login", loginUserHandler)
userRouter.post("/create", postUserHandler)
userRouter.get("/allUsers", getUserHandler)
userRouter.put("/update", updateUserHandler)
userRouter.get("/:id", getUserByIDHandler)
userRouter.delete("/delete/:id", deleteUserHandler)

module.exports = userRouter