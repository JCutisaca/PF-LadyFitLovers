const nodemailer = require('nodemailer');
const EMAIL = process.env
const EMAIL_PASSWORD = process.env


const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    });
;

module.exports = transporter
