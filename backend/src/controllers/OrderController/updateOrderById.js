const { Order } = require('../../db')
const getOrderById = require('./getOrderById');
const recoverStock = require('./recoverStock');

const updateOrderById = async ({ id, status }) => {
    if (!id || !status) throw Error("Missing information: Both 'id' and 'status' are required.")
    const order = await getOrderById({ id });
    if (!order) throw Error('Order not found.')
    const orderUpdate = await Order.update({
        status,
    },
        { where: { id }, returning: true }
    )
    if (status === "Cancelada") {
        await recoverStock(id)
    }
    return orderUpdate;
}

module.exports = updateOrderById;