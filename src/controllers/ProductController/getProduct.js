const { Product } = require('../../db')

const getProduct = async() => {

    const allProduct = await Product.findAll()
    
    return allProduct
}

module.exports = {
    getProduct
}