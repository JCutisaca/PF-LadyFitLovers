const { Op } = require('sequelize')
const { Product, Category } = require('../../db')

const getProductByName = async({name}) => {
   if(!name) throw Error('No se recibio ningun parametro')
    const resultados = await Product.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`,
          }
        }, include: [Category], attributes: {
        exclude: ['CategoryId']
      }
      })
      return resultados
}

module.exports = {
    getProductByName
}
