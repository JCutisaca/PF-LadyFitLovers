const { User, PurchaseHistory, Cart } = require('../../db')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;
const mailUserCreated = require('../../helpers/mailUserCreated')

const postUser = async ({ name, surname, email, phone, password, address, typeUser }) => {
  if (!(name || surname || email || password)) throw Error("Required data is missing. Please provide name, surname, email, and password.")
  if(password.length < 6 || password.length > 10) throw Error('Password must be between 6 and 10 characters in length.')
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/i;
  if (!emailRegex.test(email)) throw Error('Invalid email address.')
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user, created] = await User.findOrCreate({
    where: {
      name: name,
      surname: surname,
      email: email,
      phone: phone ? phone : null,
      password: hashedPassword,
      typeUser: typeUser ? typeUser : "User",
      userBan: false,
      image: null,
      address: address ? address : null
    }
  })
  if (created){mailUserCreated(email)}
  if (!created) throw Error("User with the provided information already exists.")
  const purchaseHistory = await PurchaseHistory.create({});
  await user.setPurchaseHistory(purchaseHistory);
  const cartUser = await Cart.create({});
  await user.setCart(cartUser);
  const {id} = user.dataValues;
  const token = jwt.sign({id}, JWT_SECRET )
  return ({ message: `User Created: ${user.name}`, token });
}

module.exports = {
  postUser
};


