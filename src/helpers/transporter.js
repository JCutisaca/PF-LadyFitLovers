/* const { google } = require('googleapis'); */
/* const nodemailer = require('nodemailer');
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2

const oAuth2Client = new OAuth2(
  process.env.NODE_CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
  tls: {
      rejectUnauthorized: false,
  },
})

const accessToken = oAuth2Client.getAccessToken()

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
  tls: { rejectUnauthorized: false},
});
;


module.exports = transporter
 */