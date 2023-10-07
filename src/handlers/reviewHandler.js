const {
  createReview,
} = require("../controllers/ReviewController/postReview");
const {
  getAllReviews,
} = require("../controllers/ReviewController/getAllReviews");
const { createProductReview } = require("../controllers/ReviewController/postReviewProduct");
const { getAllProductReviews } = require("../controllers/ReviewController/getAllReviewProduct");
const { deleteReviewProduct } = require("../controllers/ReviewController/deleteReviewProduct");

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
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const postReviewProductHandler = async (req, res) => {
  try {
    await createProductReview(req, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getReviewsProductHandler = async (req, res) => {
  try {
    await getAllProductReviews(req, res);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const deleteReviewProductHandler = async (req, res) => {

  try {
    const {id} = req.params;
      const deleted = await deleteReviewProduct(+id)

      res.status(200).send("Review  has deleted💥💥")
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

module.exports = {
  postReviewHandler,
  getReviewsHandler,
  postReviewProductHandler,
  getReviewsProductHandler,
  deleteReviewProductHandler
};
