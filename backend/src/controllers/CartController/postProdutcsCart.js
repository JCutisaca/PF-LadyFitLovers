const { Cart } = require('../../db')

const postProductsCart = async ({ userId, products }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const findCartUser = await Cart.findOne({ where: { UserId: userId } });
    if (!findCartUser) throw Error("Cart not found for this user.")
    const updateProductsCart = await findCartUser.update({
        products: products
    })
    return updateProductsCart;
}

module.exports = postProductsCart