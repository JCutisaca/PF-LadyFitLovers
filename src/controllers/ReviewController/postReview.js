

const { Review, User } = require('../../db');

const createReview = async (req, res) => {
  const { userId, reviewText } = req.body;

  try {

    const user = await User.findOne(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const review = await Review.create({
      userId: userId,
      reviewText: reviewText,
    });

    await  user.addReviews(review)

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
};






