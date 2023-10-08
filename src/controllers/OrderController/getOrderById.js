const { Order } = require('../../db')

const getOrderById = async ({ id }) => {
    if (!id) throw Error("Please provide a valid ID.")
    const findOrder = await Order.findOne({ where: { id } })
    return findOrder;
}

module.exports = getOrderById;