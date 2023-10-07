const { Router } = require("express");
const {
  postReviewHandler,
  getReviewsHandler,
  getReviewsProductHandler,
  postReviewProductHandler,
  deleteReviewProductHandler,
} = require("../handlers/reviewHandler");
const reviewRouter = Router();

reviewRouter.get("/product", getReviewsProductHandler);
reviewRouter.post("/product", postReviewProductHandler);
reviewRouter.delete("/product/delete/:id", deleteReviewProductHandler);
reviewRouter.get("/", getReviewsHandler);
reviewRouter.delete("/delete/:id", deleteReviewProductHandler);
reviewRouter.post("/", postReviewHandler);

module.exports = reviewRouter;
