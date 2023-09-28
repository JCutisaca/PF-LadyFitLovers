const { Product } = require('../../db')

const getProduct = async() => {
    const allProduct = await Product.findAll({attributes: { exclude: ['onSale'] },})
    return allProduct
}

module.exports = {
    getProduct
}
