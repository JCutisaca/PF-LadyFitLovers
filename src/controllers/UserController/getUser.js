const { User } = require('../../db')

const getUser = async() => {
    const allUser = await User.findAll()
    console.log("esto", allUser);
    return allUser
}

module.exports = {
    getUser
}