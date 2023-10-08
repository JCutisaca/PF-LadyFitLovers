const { Order } = require('../../db')

const getAllOrdersByUserId = async ({ userId }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const userOrders = await Order.findAll({ where: { UserId: userId } })
    return userOrders;
}

module.exports = getAllOrdersByUserId;