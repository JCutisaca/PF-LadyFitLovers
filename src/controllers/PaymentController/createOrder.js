const mercadopago = require('mercadopago')
const { PROD_ACCESS_TOKEN } = process.env
const axios = require('axios')


mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN
})

const createOrder = async (products) => {
    const items = products.map(product => {
        return {
            id: product.id,
            title: product.name,
            quantity: product.quantity,
            unit_price: product.price,
            currency_id: 'ARS',
            picture_url: product.image,
            description: product.name
        }
    });

    let preference = {
        items,
        back_urls: {
            success: "http://localhost:3001/payment/success",
            failure: "http://localhost:3001/payment/webhook",
            pending: "http://localhost:3001/payment/pending"
        },
        notification_url: "https://9197-190-122-197-186.ngrok-free.app/payment/webhook"
    }
    const order = await mercadopago.preferences.create(preference);

    return order;
}

module.exports = createOrder;
