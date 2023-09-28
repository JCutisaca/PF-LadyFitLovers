const { Product } = require('../../db')

const getProduct = async() => {
    const allProduct = await Product.findAll()
    console.log("esto", allProduct);
    return allProduct
}

module.exports = {
    getProduct
}