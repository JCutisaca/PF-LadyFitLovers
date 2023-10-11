const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler, updateUserHandler, loginUserHandler, userLoginGoogleHandler } = require("../handlers/userHandler");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenParams = require("../middlewares/verifyTokenParams");

const userRouter = Router()

userRouter.post("/login", loginUserHandler)
userRouter.post("/loginGoogle", userLoginGoogleHandler)
userRouter.post("/create", postUserHandler)
userRouter.get("/allUsers", verifyTokenAdmin, getUserHandler)
userRouter.put("/update", verifyToken, updateUserHandler)
userRouter.get("/:id", verifyTokenParams, getUserByIDHandler)
userRouter.delete("/delete/:id", verifyTokenAdmin, deleteUserHandler)

module.exports = userRouter