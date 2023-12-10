const { User, Product } = require('../../db')

const getFavByUser  = async ({ id }) => {
    if(!id) throw new Error("Please provide a valid ID.")

    const userById = await User.findByPk(id, {include: [
        {
          model: Product,
          as: 'FavoriteProducts',
        },
      ]})

      if(!userById) {
        throw new Error("Please provide a valid ID.")
      } else {
          return userById.FavoriteProducts
      }
}

module.exports = getFavByUser;