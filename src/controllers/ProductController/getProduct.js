const { Product, Category } = require('../../db')

const getProduct = async() => {
    const allProduct = await Product.findAll({include: [Category], attributes: {
        exclude: ['CategoryId']
      }})
    
    if (!allProduct) {
        throw new Error("There are no products");
      }

    return allProduct
}

module.exports = {
    getProduct
}
