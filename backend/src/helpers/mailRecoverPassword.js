const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const recover = require('./mailRecoverPasswordHTML');

const OAuth2 = google.auth.OAuth2

const mailRecoverPassword = async (email, recoveryCode ) => {
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

  const HTML = recover(recoveryCode)
  

  const mailObject = {
      from: `Lady Fit Lovers ${process.env.EMAIL}`,
      to: email,
      subject: 'Recuperación de contraseña',
      html: HTML
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

module.exports = mailRecoverPassword