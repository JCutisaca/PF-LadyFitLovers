const { User } = require('../../db')

const updateProduct = async({id}, name) => {
    console.log("aca", id);
    console.log("por body", name);
    const userEncontrado = await User.findOne({where: {id}})
    console.log(userEncontrado);
    
}

module.exports = {
    updateProduct
}