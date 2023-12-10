const update = require("../helpers/mailUpdatedPasswordHTML");
const transporter = require("./nodemailer");
const { EMAIL_USER } = process.env

const mailUpdatedPassword = async (email) => {
    const HTML = update();
    await transporter.sendMail({
        from: `Lady Fit Lovers ${EMAIL_USER}`,
        to: email,
        subject: 'Cambio de contraseña exitoso',
        html: HTML
    })
}

module.exports = mailUpdatedPassword;