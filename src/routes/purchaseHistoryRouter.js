const { Router } = require("express");
const { postProductsPurchaseHandler, getPurchaseHistoryByUserIdHandler } = require("../handlers/purchaseHistoryHandler");


const purchaseHistoryRouter = Router()

purchaseHistoryRouter.post("/add", postProductsPurchaseHandler)
purchaseHistoryRouter.get("/:userId", getPurchaseHistoryByUserIdHandler)


module.exports = purchaseHistoryRouter