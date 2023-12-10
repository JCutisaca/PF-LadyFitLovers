const transporter = require("./nodemailer");
const {EMAIL_USER} = process.env
const order = require('../helpers/mailOrderHTML')

const mailOrder = async (name, email, products, totalAmount) => {

    const productHTML = products.map(product => `
    <div>
      <h4>${product.name}</h4>
      <img src="${product.image}" alt="Imagen de ${product.name}">
      <h5>Precio: $${product.price}</h5>
      <h5>Color: ${product.color}</h5>
      <h5>Cantidad: ${product.quantity}</h5>
      <h5>Talle: ${product.size}</h5>
    </div>
  `).join('');

    const html = order(name, productHTML, totalAmount)

    await transporter.sendMail({
        from: `Lady Fit Lovers ${EMAIL_USER}`,
        to: email,
        subject: '¡Gracias por tu compra!',
        html: html
    })
}

module.exports = mailOrder;