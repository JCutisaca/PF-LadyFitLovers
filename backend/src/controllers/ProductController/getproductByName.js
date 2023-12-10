const { Op } = require('sequelize');
const { Product, Category } = require('../../db');

const getProductByName = async ({ name }) => {
  if (!name) throw Error('Name parameter is required.');
  const resultados = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      }
    },
    include: [{ model: Category, attributes: { exclude: ['CategoryId'] } }],
    attributes: { exclude: ['CategoryId'] },
  });
  return resultados;
};


module.exports = {
    getProductByName
}
