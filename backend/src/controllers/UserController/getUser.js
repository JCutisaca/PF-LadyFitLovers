const { User, Product } = require('../../db')

const getUser = async() => {
    const allUser = await User.findAll( {include: [
        {
          model: Product,
          as: 'FavoriteProducts',
        },
      ]})
    return allUser;
}

module.exports = {
    getUser
}