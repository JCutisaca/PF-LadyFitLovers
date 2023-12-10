const welcome = require("../helpers/mailUserCreatedHTML");
const transporter = require("./nodemailer")
const { EMAIL_USER } = process.env

const mailUserCreated = async (email) => {
  const welcomeHtml = welcome()
  await transporter.sendMail({
    from: `Lady Fit Lovers ${EMAIL_USER}`,
    to: email,
    subject: "Bienvenido",
    html: welcomeHtml
  })
}

module.exports = mailUserCreated;