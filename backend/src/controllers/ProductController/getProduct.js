
const { Product, Category, Review, User } = require('../../db');

const getProduct = async () => {
  try {
    const allProduct = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: {
            exclude: ['CategoryId']
          }
        },
        {
          model: Review,
          as: 'Reviews',
          include: [
            {
              model: User, // Incluir el modelo User
              as: 'User', // Asignar un alias para la relación
              attributes: ['id'], // Solo incluir el ID del usuario en la respuesta
            },
          ],
        },
      ],
      attributes: {
        exclude: ['CategoryId'],
      },
    });

    if (!allProduct) {
      throw new Error("There are no products");
    }

    return allProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProduct,
};


// const { Product, Category } = require('../../db')

// const getProduct = async() => {
//     const allProduct = await Product.findAll({include: [Category], attributes: {
//         exclude: ['CategoryId']
//       }})
    
//     if (!allProduct) {
//         throw new Error("There are no products");
//       }

//     return allProduct
// }

// module.exports = {
//     getProduct
// }
