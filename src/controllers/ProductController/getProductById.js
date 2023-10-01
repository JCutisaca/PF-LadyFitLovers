const { Product, Category } = require('../../db')

const getProductById = async ({ id }) => {
    if(!id) throw Error("Please provide a valid ID.")
    const productByID = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }
    })

    if (!productByID) {
        throw new Error("Product not found.");
    }
    return productByID
}

module.exports = {
    getProductById
}
