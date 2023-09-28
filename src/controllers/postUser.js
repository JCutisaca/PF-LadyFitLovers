const { User } = require('../db')

const postUser = async ({name, surname, email, phone, password, address, typeUser}) => {
    if (!(name || surname || email || password)) throw Error("Faltan datos")
    const [user, created] = await User.findOrCreate({
        where: {
        name: name,
        surname: surname,
        email: email,
        phone: phone? phone : null,
        password: password,
        typeUser: typeUser? typeUser : "User",
        address: address? address : null
        }
    })
    if(!created) throw Error("Ya existe xd")
    return user;
}

module.exports = postUser;