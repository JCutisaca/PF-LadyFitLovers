const { Order } = require('../../db')

const getAllOrders = async () => {
    const orders = await Order.findAll()
    return orders
}

module.exports = getAllOrders;