const { Product } = require('../../db')

const getProduct = async() => {
    const allProduct = await Product.findAll()
    
    if (!allProduct) {
        throw new Error("there are no products");
      }

    return allProduct
}

module.exports = {
    getProduct
}