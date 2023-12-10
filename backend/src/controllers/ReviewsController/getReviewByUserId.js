const { Review, User, Product } = require('../../db');

const getReviewsByUserId = async ({ userId }) => {
    if (!userId) throw Error("Please provide a valid ID.");
    const reviews = await Review.findAll({
        include: [
            {
                model: User,
                as: 'User',
                attributes: ['id'],
                where: { id: userId },
                through: { attributes: [] }
            },
            {
                model: Product,
                as: 'Product',
                attributes: ['id', 'name', 'image'],
                through: { attributes: [] }
            }
        ]
    });
    return reviews;

};

module.exports = getReviewsByUserId;