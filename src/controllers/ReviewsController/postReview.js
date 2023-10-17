const { Review, User, Product } = require("../../db");

const createReview = async (req, res) => {
  const { userId, productId, rating,  reviewText } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const review = await Review.create({
      userId: userId,
      productId: productId,
      reviewText: reviewText,
      rating: rating
    });

    await user.addReview(review);
    await product.addReview(review);

    return review;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
};
