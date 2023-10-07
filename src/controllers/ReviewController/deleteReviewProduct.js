const { Review } = require('../../db')



const deleteReviewProduct = async (id) => {
console.log(  `soy el id ${id}` );

    const reviewFound = await Review.findOne({ where: { id } })
    if (!reviewFound) {
        throw new Error("Review not found");
      }

    await Review.destroy({ where: { id } });

    return 
}

module.exports = {
    deleteReviewProduct
};