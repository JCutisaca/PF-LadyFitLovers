const { Product, Category } = require('../../db')

const getProductById = async ({ id }) => {
    const productByID = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }
    })

    if (!productByID) {
        throw new Error("Product no encontrado");
    }
    return productByID
}

module.exports = {
    getProductById
}
