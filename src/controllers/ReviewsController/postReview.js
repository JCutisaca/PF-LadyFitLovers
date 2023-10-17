const { Review, User, Product } = require("../../db");

const createReview = async ({userId, productId, rating,  reviewText }) => {

    const user = await User.findByPk(userId);
    if (!user) {
      throw Error("Required data is missing. Please provide userId")
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      throw Error("Required data is missing. Please provide productId")
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
};

module.exports = {
  createReview,
};
