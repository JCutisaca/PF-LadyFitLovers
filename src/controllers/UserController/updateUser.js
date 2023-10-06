const { User } = require('../../db');
const bcrypt = require('bcryptjs')

const updateUser = async ({ id, name, surname, email, phone, password, address, typeUser, userBan, image }) => {

    if (!id) throw Error("Please provide a valid ID.")
    if (!(name || surname || email || phone || password || address || typeUser || image || userBan !== undefined)) throw Error("Please specify the information you want to update.")
    const findUser = await User.findOne({ where: { id } })
    if (!findUser) throw Error("User not found.")
    const updatedUserBan = userBan !== undefined ? userBan : findUser.userBan;
    const update = await User.update({
        name: name ? name : findUser.name,
        surname: surname ? surname : findUser.surname,
        email: email ? email : findUser.email,
        phone: phone ? phone : findUser.phone,
        password: password ? await bcrypt.hash(password, 10) : findUser.password,
        address: address ? address : findUser.address,
        userBan: updatedUserBan,
        image: image ? image : findUser.image,
        typeUser: typeUser ? typeUser : findUser.typeUser
    },
        { where: { id } }
    )

    const userUpdate = await User.findOne({ where: { id } })
    return userUpdate;
}


module.exports = {
    updateUser
}
