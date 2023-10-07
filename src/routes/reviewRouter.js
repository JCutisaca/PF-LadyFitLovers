const { Router } = require("express");
const {
  postReviewHandler,
  getReviewsHandler,
  getReviewsProductHandler,
  postReviewProductHandler,
} = require("../handlers/reviewHandler");
const reviewRouter = Router();

reviewRouter.get("/product", getReviewsProductHandler);
reviewRouter.post("/product", postReviewProductHandler);
reviewRouter.get("/", getReviewsHandler);
reviewRouter.post("/", postReviewHandler);

module.exports = reviewRouter;
