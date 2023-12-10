const { Router } = require("express");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenParams = require("../middlewares/verifyTokenParams");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler, updateUserHandler, loginUserHandler, userLoginGoogleHandler, userPasswordRecovery, updateUserPassword, userLoginFacebookHandler } = require("../handlers/userHandler");

const userRouter = Router()

userRouter.post("/login", loginUserHandler)
userRouter.post("/loginGoogle", userLoginGoogleHandler)
userRouter.post("/loginFacebook", userLoginFacebookHandler)
userRouter.post("/create", postUserHandler)
userRouter.get("/allUsers", verifyTokenAdmin, getUserHandler)
userRouter.put("/update", verifyToken, updateUserHandler)
userRouter.get("/:id", verifyTokenParams, getUserByIDHandler)
userRouter.delete("/delete/:id", verifyTokenAdmin, deleteUserHandler)
userRouter.put("/recoverPassword", userPasswordRecovery)
userRouter.put("/recoverPassword/reset", updateUserPassword)

module.exports = userRouter