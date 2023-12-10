const { User } = require('../../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const loginUser = async ({ email, password }) => {
    const findUser = await User.findOne({ where: { email } })
    if (!findUser) throw Error("User not found.")
    const { id } = findUser.dataValues;
    const validatePass = await bcrypt.compare(password, findUser.dataValues.password)
    if (!validatePass) throw Error("Invalid password. Please check your password and try again.")
    const token = jwt.sign({ id, email }, JWT_SECRET)
    return ({idUser: id, token})
}

module.exports = loginUser;