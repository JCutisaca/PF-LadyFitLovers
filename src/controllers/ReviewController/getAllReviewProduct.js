const { Review, Category, Product } = require('../../db');

const getAllProductReviews = async (req, res) => {
  try {


    const reviews = await Review.findAll({
      include: [
          {
              model: Product,
              as: 'Product',
          },
      ]
  });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = {
    getAllProductReviews,
};
