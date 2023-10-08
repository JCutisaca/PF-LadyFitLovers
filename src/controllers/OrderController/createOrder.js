const getUserByID = require('../UserController/getUserById');
const { User, Order } = require('../../db')

const createOrder = async ({ userId, products, mpId, totalAmount }) => {
    if (!userId || !products.length || !mpId) throw Error('Required data is missing to create the order.')
    const findUser = await getUserByID({ id: userId })
    if (!findUser) throw Error('User not found.')

    const date = new Date();
    const orderDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const order = await Order.create({
        products,
        totalAmount,
        orderDate,
        status: "En proceso",
        mercadopagoTransactionId: mpId
    })
    await findUser.addOrder(order)
    const userOrder = await Order.findOne({ where: { id: order.dataValues.id } })
    return userOrder;
}

module.exports = createOrder;