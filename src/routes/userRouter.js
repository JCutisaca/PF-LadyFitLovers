const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler, updateUserHandler } = require("../handlers/userHandler");
const userRouter = Router()

userRouter.post("/create", postUserHandler)
userRouter.get("/allUsers", getUserHandler)
userRouter.put("/update/:id", updateUserHandler)
userRouter.get("/:id", getUserByIDHandler)
userRouter.delete("/delete/:id", deleteUserHandler)

module.exports = userRouter