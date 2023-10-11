const { Router } = require("express");
const {
  postReviewHandler,
  getReviewsHandler,
  deleteReviewHandler,
} = require("../handlers/reviewHandler");
const reviewRouter = Router();

reviewRouter.post("/", postReviewHandler);
reviewRouter.get("/", getReviewsHandler);
reviewRouter.delete("/delete/:id", deleteReviewHandler);

module.exports = reviewRouter;
