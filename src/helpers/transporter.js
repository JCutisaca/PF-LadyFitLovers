const nodemailer = require('nodemailer');
const EMAIL = process.env
const EMAIL_PASSWORD = process.env


const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    });
;

module.exports = transporter
