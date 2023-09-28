const { where } = require('sequelize');
const { User } = require('../../db')

const deleteUser = async (id) => {
    const userFound = await User.findOne({ where: { id } })
    if (!userFound) {
        throw new Error("Usuario no encontrado");
      }
     
   await User.destroy({ where: { id } });

return 
}

module.exports = {
    deleteUser
};