const { Review, User, Product } = require('../../db');

const getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.findAll({
      include: [
        {
          model: Product,
          as: 'Product', 
          attributes: ['id'], 
        },
        {
          model: User,
          as: 'User',
          attributes: ['id'], 
        },
      ],

  });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = {
    getAllReviews,
};
