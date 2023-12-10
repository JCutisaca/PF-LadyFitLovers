const { Cart } = require('../../db')

const getCartByUserId = async ({ userId }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const findCartUser = await Cart.findOne({ where: { UserId: userId } })
    if(!findCartUser) throw Error('Cart not found for this user.')
    return findCartUser;
}

module.exports = getCartByUserId;