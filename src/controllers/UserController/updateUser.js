const { User } = require('../../db');
const getUserByID = require('./getUserById');
const bcrypt = require('bcryptjs')

const updateUser = async ({ id, name, surname, email, phone, password, address, typeUser, userBan }) => {

    if (!id) throw Error("Please provide a valid ID.")
    if (!(name || surname || email || phone || password || address || typeUser || userBan)) throw Error("Please specify the information you want to update.")
    const findUser = await User.findOne({ where: { id } })
    if (!findUser) throw Error("User not found.")
    const update = await User.update({
        name: name ? name : findUser.name,
        surname: surname ? surname : findUser.surname,
        email: email ? email : findUser.email,
        phone: phone ? phone : findUser.phone,
        password: password ? await bcrypt.hash(password, 10) : findUser.password,
        address: address ? address : findUser.address,
        userBan: userBan? userBan : findUser.userBan,
        typeUser: typeUser ? typeUser : "User"
    },
        { where: { id } }
    )

    const userUpdate = await User.findOne({ where: { id } })
    return userUpdate;
}


module.exports = {
    updateUser
}
