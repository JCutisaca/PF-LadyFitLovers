const { Cart } = require('../../db')

const cleanProductsCart = async ({ userId }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const findCartUser = await Cart.findOne({ where: { UserId: userId } })
    if (!findCartUser) throw Error('Cart not found for this user.')
    const cleanCart = await findCartUser.update({
        products: null
    })
    return cleanCart;
}

module.exports = cleanProductsCart;