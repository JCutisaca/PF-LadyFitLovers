const { User } = require('../../db')

const getUser = async() => {
    const allUser = await User.findAll()
    return allUser;
}

module.exports = {
    getUser
}