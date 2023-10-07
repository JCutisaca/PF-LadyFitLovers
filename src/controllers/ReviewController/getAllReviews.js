const { Review } = require('../../db');

const getAllReviews = async (req, res) => {
  try {
    
    const reviews = await Review.findAll();
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReviews,
};
