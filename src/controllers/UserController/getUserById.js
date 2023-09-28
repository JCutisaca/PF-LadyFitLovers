const { User } = require('../../db')

const getUSerByID = async({id}) => {
    const userById = await User.findOne({where: {id}})
    return userById
}

module.exports = {
    getUSerByID
}