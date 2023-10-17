const { Review, User, Product } = require('../../db');

const getAllReviews = async () => {

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
};



module.exports = {
    getAllReviews,
};
