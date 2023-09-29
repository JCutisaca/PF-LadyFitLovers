const { Product } = require('../../db')

const getProductById = async({id}) => {
    const productByID = await Product.findOne({attributes: { exclude: ['onSale'] }},{where: {id}})
    return productByID
}

module.exports = {
    getProductById
}
