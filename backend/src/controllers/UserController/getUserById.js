const { User } = require('../../db')

const getUserByID = async({id}) => {
    if(!id) throw Error("Please provide a valid ID.")
    const userById = await User.findOne({where: {id}})
    return userById
}

module.exports = getUserByID;