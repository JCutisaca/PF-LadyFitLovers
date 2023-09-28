const { Product } = require('../../db')

const deleteProduct = async (id) => {

    const userFound = await Product.findOne({ where: { id } })
    if (!userFound) {
        throw new Error("Product not found");
      }
    await Product.destroy({ where: { id } });

    return 
}

module.exports = {
    deleteProduct
};