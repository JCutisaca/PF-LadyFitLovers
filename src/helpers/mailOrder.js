/* const { google } = require('googleapis'); */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const order = require('./mailOrderHTML')



const OAuth2 = google.auth.OAuth2

const mailOrder = async (name, email, products, totalAmount) => {
  const oAuth2Client = new OAuth2(
  process.env.NODE_CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
  )

  oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
  tls: {
      rejectUnauthorized: false,
  },})

  const accessToken = await oAuth2Client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.NODE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    },
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: { rejectUnauthorized: false},}
  );

  const productHTML = products.map(product => `
    <div>
      <h4>${product.name}</h4>
      <img src="${product.image}" alt="Imagen de ${product.name}">
      <h5>Price: $${product.price}</h5>
      <h5>Color: ${product.color}</h5>
      <h5>Quantity: ${product.quantity}</h5>
      <h5>Size: ${product.size}</h5>
    </div>
  `).join('');

  const html = order(name, productHTML, totalAmount)
  

  const mailObject = {
      from: `Lady Fit Lovers ${process.env.EMAIL}`,
      to: email,
      subject: '¡Gracias por tu compra!',
      html: html
  };

  const result = await transporter.sendMail(mailObject, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  })
  
  return result 
}

module.exports = mailOrder
