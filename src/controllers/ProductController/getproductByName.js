const { Op } = require('sequelize')
const { Product } = require('../../db')

const getProductByName = async({name}) => {
 

    const resultados = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // Utiliza Op.like para buscar nombres que contengan la cadena proporcionada
          }
        }
      })
      return resultados
}

module.exports = {
    getProductByName
}