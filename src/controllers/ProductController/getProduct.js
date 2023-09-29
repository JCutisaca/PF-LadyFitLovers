const { Product } = require('../../db')

const getProduct = async() => {
    const allProduct = await Product.findAll({attributes: { exclude: ['onSale'] },})
    console.log("esto", allProduct);
    return allProduct
}

module.exports = {
    getProduct
}
