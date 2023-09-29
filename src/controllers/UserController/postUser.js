const { User } = require('../../db')
const bcrypt = require("bcrypt");


const postUser = async ({name, surname, email, phone, password, address, typeUser}) => {
    if (!(name || surname || email || password)) throw Error("Faltan datos")
    // Generar un hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
    const [user, created] = await User.findOrCreate({
        where: {
        name: name,
        surname: surname,
        email: email,
        phone: phone? phone : null,
        password: hashedPassword,
        typeUser: typeUser? typeUser : "User",
        address: address? address : null
        }
    })
    if(!created) throw Error("Ya existe xd")
    return user;
}

module.exports = {
     postUser
     };

     
