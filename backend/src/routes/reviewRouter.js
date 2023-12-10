const { Router } = require("express");
const {
  postReviewHandler,
  getReviewsHandler,
  deleteReviewHandler,
  getReviewsByUserIdHandler,
} = require("../handlers/reviewHandler");
const reviewRouter = Router();

reviewRouter.post("/", postReviewHandler);
reviewRouter.get("/", getReviewsHandler);
reviewRouter.get("/user/:userId", getReviewsByUserIdHandler);
reviewRouter.delete("/delete/:id", deleteReviewHandler);

module.exports = reviewRouter;
