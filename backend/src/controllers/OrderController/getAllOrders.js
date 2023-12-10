const { Order, User } = require('../../db')

const getAllOrders = async () => {
    const orders = await Order.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'surname', 'email', 'phone', 'address']
        }
    })
    return orders
}

module.exports = getAllOrders;