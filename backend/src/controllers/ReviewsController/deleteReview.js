const { Review } = require('../../db')



const deleteReview = async (id) => {

    const reviewFound = await Review.findOne({ where: { id } })
    if (!reviewFound) {
        throw new Error("Review not found");
      }

    await Review.destroy({ where: { id } });

    return 
}

module.exports = {
    deleteReview
};