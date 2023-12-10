const { createReview } = require("../controllers/ReviewsController/postReview");
const {
  getAllReviews,
} = require("../controllers/ReviewsController/getAllReviews");
const {
  deleteReview,
} = require("../controllers/ReviewsController/deleteReview");
const getReviewsByUserId = require("../controllers/ReviewsController/getReviewByUserId");

const postReviewHandler = async (req, res) => {
  try {
    const review = await createReview(req.body);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReviewsHandler = async (req, res) => {
  try {
    const reviews =  await getAllReviews();
    res.status(201).json(reviews)
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteReviewHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteReview(+id);

    res.status(200).send("Review  has deleted💥💥");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviewsByUserIdHandler = async (req, res) => {
  try {
    const reviewUser = await getReviewsByUserId(req.params)
    res.status(200).json(reviewUser)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  postReviewHandler,
  getReviewsHandler,
  deleteReviewHandler,
  getReviewsByUserIdHandler
};
