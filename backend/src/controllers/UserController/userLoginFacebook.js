const axios = require('axios')
const { User, Cart } = require('../../db')
const { CLIENT_ID_FACEBOOK, FACEBOOK_PASSWORD_APP, URL_FACEBOOK_TOKEN, JWT_SECRET } = process.env
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailUserCreated = require('../../config/mailUserCreated');

const userLoginFacebook = async ({ profileObj }) => {
    if (!profileObj.accessToken) throw Error('Token is required.')
    const { data } = await axios(`${URL_FACEBOOK_TOKEN}${profileObj.accessToken}&access_token=${CLIENT_ID_FACEBOOK}|${FACEBOOK_PASSWORD_APP}`)
    if (data.data.app_id !== CLIENT_ID_FACEBOOK || !data.data.is_valid) throw Error('Invalid client ID. Please provide a valid client ID.')
    const newEmail = profileObj.email.toLowerCase()
    const findUser = await User.findOne({ where: { email: newEmail } })
    if (!findUser) {
        const generateRandomPassword = (length = 8) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset.charAt(randomIndex);
            }
            return password;
        }
        const hashedPassword = await bcrypt.hash(generateRandomPassword(), 10);
        const newUser = await User.create({
            name: profileObj.first_name,
            surname: profileObj.last_name,
            email: newEmail,
            phone: null,
            password: hashedPassword,
            typeUser: "User",
            userBan: false,
            image: null,
            address: null
        })
        const cartUser = await Cart.create({});
        await newUser.setCart(cartUser);
        const { id } = newUser.dataValues;
        const token = jwt.sign({ id }, JWT_SECRET)
        mailUserCreated(newEmail)
        return ({ message: `User Created: ${newUser.name}`, token, idUser: id });
    }
    const { id, email } = findUser.dataValues;
    const token = jwt.sign({ id, email }, JWT_SECRET)
    return ({ idUser: id, token })
}

module.exports = userLoginFacebook;