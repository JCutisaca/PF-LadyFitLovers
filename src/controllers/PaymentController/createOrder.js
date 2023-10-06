const mercadopago = require('mercadopago')
const { PROD_ACCESS_TOKEN, URL_SV } = process.env
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
            success: `${URL_SV}/payment/success`,
            failure: `${URL_SV}/payment/webhook`,
            pending: `${URL_SV}/payment/pending`
        },
        notification_url: `${URL_SV}/payment/webhook`
    }
    const order = await mercadopago.preferences.create(preference);

    return order;
}

module.exports = createOrder;
