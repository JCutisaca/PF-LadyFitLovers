const mailUpdatedPassword = require('../../config/mailUpdatedPassword');
const { User } = require('../../db');
const bcrypt = require('bcryptjs')

const updatePassword = async ({email, password}) => {
    if (!password) throw Error("There is no password submitted.")
    if (!email) throw Error("There is no email submitted.")
    if (!email && !password) throw Error("Nothing was submitted.")
    const findUser = await User.findOne({ where: { email } })
    if (findUser){
        const hashedPassword = await bcrypt.hash(password, 10)
        const update = await User.update({
        password: hashedPassword
    }, 
        {where: { email } }
    )
    mailUpdatedPassword(email)
    } else if (!findUser){throw new Error("User not found.")}
}

module.exports = {
    updatePassword
}