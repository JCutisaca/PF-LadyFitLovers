const { createReview } = require("../controllers/ReviewsController/postReview");
const {
  getAllReviews,
} = require("../controllers/ReviewsController/getAllReviews");
const {
  deleteReview,
} = require("../controllers/ReviewsController/deleteReview");

const postReviewHandler = async (req, res) => {
  try {
    await createReview(req, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getReviewsHandler = async (req, res) => {
  try {
    await getAllReviews(req, res);
  } catch (error) {
    return res.status(500).json({ error: message.error });
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

module.exports = {
  postReviewHandler,
  getReviewsHandler,
  deleteReviewHandler,
};
