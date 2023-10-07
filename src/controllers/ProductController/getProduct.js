const { Product, Category, Review } = require('../../db')

const getProduct = async() => {
    const allProduct = await Product.findAll({
      include: [Category], attributes: {
        exclude: ['CategoryId']
      },
      include: [
        {
        model: Review,
        as: 'Reviews',
      attributes: ['id','reviewText'], 
    }
  ]
    })
    
    if (!allProduct) {
        throw new Error("There are no products");
      }

    return allProduct
}

module.exports = {
    getProduct
}
