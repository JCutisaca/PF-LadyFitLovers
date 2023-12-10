const { Product, Category, Review, User } = require('../../db')

const getProductById = async ({ id }) => {
    if (!id) throw Error("Please provide a valid ID.")
    const productByID = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }, include: [
            {
                model: Review,
                include: [{
                    model: User,
                    as: 'User',
                    attributes: ['id', 'name', 'image'],
                }],
                as: 'Reviews',
                attributes: ['id', 'reviewText', 'rating'],
            }
        ]
    })

    if (!productByID) {
        throw new Error("Product not found.");
    }
    return productByID
}

module.exports = {
    getProductById
}
