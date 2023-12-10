const { Order, User } = require('../../db')

const getAllOrdersByUserId = async ({ userId }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const userOrders = await Order.findAll({
        where: { UserId: userId },
        include: {
            model: User,
            attributes: ['id', 'name', 'surname', 'email', 'phone', 'address']
        }
    })
    return userOrders;
}

module.exports = getAllOrdersByUserId;