const { User } = require('../../db')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;


const postUser = async ({ name, surname, email, phone, password, address, typeUser }) => {

  if (!(name || surname || email || password)) throw Error("Faltan datos")

  const hashedPassword = await bcrypt.hash(password, 10);
  const [user, created] = await User.findOrCreate({
    where: {
      name: name,
      surname: surname,
      email: email,
      phone: phone ? phone : null,
      password: hashedPassword,
      typeUser: typeUser ? typeUser : "User",
      address: address ? address : null
    }
  })
  if (!created) throw Error("Ya existe xd")
  const {id} = user.dataValues;
  const token = jwt.sign({id}, JWT_SECRET )
  return ({ message: `User Created: ${user.name}`, token });
}

module.exports = {
  postUser
};


