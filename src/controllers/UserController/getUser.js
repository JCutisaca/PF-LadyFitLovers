const { User, Product, Review } = require('../../db'); // Asegúrate de que la importación de Review sea correcta

const getUser = async () => {
    try {
        const allUsers = await User.findAll({
            include: [
                {
                    model: Product,
                    as: 'FavoriteProducts',
                },
                {
                    model: Review,
                    as: 'Reviews',
                  attributes: ['id','reviewText'], 
                }
            ]
        });
        return allUsers;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUser
};










// const { User, Product, Reviews } = require('../../db')

// const getUser = async() => {
//     const allUser = await User.findAll( {include: [
//         {
//           model: Product,
//           as: 'FavoriteProducts',
//         },
//         {
//           model:Reviews ,
//           as:'reviews'
//         }
//       ]})
//     return allUser;
// }

// module.exports = {
//     getUser
// }