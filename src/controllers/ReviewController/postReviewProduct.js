

const { Review, Product } = require('../../db');

const createProductReview = async (req, res) => {
  const {productId, reviewText } = req.body;

  try {

    const product = await Product.findOne(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

  
    const review = await Review.create({
        productId: productId,
      reviewText: reviewText,
    });

    await  product.addReviews(review)

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createProductReview,
};