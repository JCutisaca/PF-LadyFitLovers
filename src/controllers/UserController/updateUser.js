const { User } = require('../../db');
const bcrypt = require('bcryptjs')

const updateUser = async ({ id, name, surname, email, phone, password, newPassword, address, typeUser, userBan, image }) => {

    if (!id) throw Error("Please provide a valid ID.")
    if (!(name || surname || email || phone || address || typeUser || image || userBan !== undefined || (password && newPassword))) throw Error("Please specify the information you want to update.")
    const findUser = await User.findOne({ where: { id } })
    if (!findUser) throw Error("User not found.")
    const updatedUserBan = userBan !== undefined ? userBan : findUser.userBan;
    let updatePassword = ""
    if (password && newPassword) {
        const verifyPassword = await bcrypt.compare(password, findUser.dataValues.password)
        if(!verifyPassword) throw Error('Password does not match')
    }
    const update = await User.update({
        name: name ? name : findUser.name,
        surname: surname ? surname : findUser.surname,
        email: email ? email : findUser.email,
        phone: phone ? phone : findUser.phone,
        password: newPassword && password ? await bcrypt.hash(newPassword, 10) : findUser.password,
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
