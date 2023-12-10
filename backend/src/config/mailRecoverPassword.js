const recover = require("../helpers/mailRecoverPasswordHTML");
const transporter = require("./nodemailer");
const {EMAIL_USER} = process.env

const mailRecoverPassword = async (email, recoveryCode) => {

    const HTML = recover(recoveryCode)
    await transporter.sendMail({
        from: `Lady Fit Lovers ${EMAIL_USER}`,
        to: email,
        subject: 'Recuperación de contraseña',
        html: HTML
    })
}

module.exports = mailRecoverPassword;