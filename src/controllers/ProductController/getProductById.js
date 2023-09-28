const { Product } = require('../../db')

const getProductById = async({id}) => {
    const productByID = await Product.findOne({where: {id}})
   
    if (!productByID) {
        throw new Error("Product no encontrado");
      }
    return productByID
}

module.exports = {
    getProductById
}
