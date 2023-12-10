const { User } = require('../../db')

const deleteUser = async (id) => {
    if(!id) throw Error("Please provide a valid ID.")
    const userFound = await User.findOne({ where: { id } })
    if (!userFound) {
        throw new Error("User not found.");
    }

    await User.destroy({ where: { id } });

    return "User has been deleted successfully.";
}

module.exports = {
    deleteUser
};