const { User, Product } = require('../../db')

const removeProductFav = async ({ productId, userId }) => {
    if (!productId || !userId) throw Error("Please provide a valid ID.")
    const findUser = await User.findOne({ where: { id: userId } })
    if (!findUser) throw Error('User not found.')
    const findProduct = await Product.findOne({ where: { id: productId } })
    if (!findProduct) throw Error('Product not found.')
    await findUser.removeFavoriteProduct(findProduct);
    return "Product removed from favorites successfully."
}

module.exports = removeProductFav;