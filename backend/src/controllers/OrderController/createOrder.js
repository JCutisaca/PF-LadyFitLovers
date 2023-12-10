const getUserByID = require('../UserController/getUserById');
const { Order } = require('../../db');
const updateStock = require('./updateStock');
const mailOrder = require('../../config/mailOrder');

const createOrder = async ({ userId, products, mpId, totalAmount, shippingCost, shippingType }) => {
    if (!userId || !products.length || !mpId || !shippingCost || !shippingType) throw Error('Required data is missing to create the order.')
    const findUser = await getUserByID({ id: userId })
    const { name, email } = findUser
    
    if (!findUser) throw Error('User not found.')
    const date = new Date();
    const orderDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const order = await Order.create({
        products,
        totalAmount,
        orderDate,
        status: "En proceso",
        shippingCost, 
        shippingType,
        mercadopagoTransactionId: mpId
    })
    // if (order) {mailOrder(name, email, products, totalAmount)}
    if(order) {
        mailOrder(name, email, products, totalAmount)
    }
    await findUser.addOrder(order)
    const userOrder = await Order.findOne({ where: { id: order.dataValues.id } })
    const update = await updateStock(products)
    return userOrder;
}

module.exports = createOrder;