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
    return reviews;
  } catch (error) {
    throw error;
  }
};



module.exports = {
    getAllReviews,
};
