const { User } = require('../../db')

const updateUser = async(id, body) => {

    const userEncontrado = await User.findByPk(id) 

    let valores = Object.values(body)
    console.log(valores);
    for (let i = 0; i< valores.length; i++) {
        if(!valores[i].length) {
            return "No puedne estar vacios"
        }
    }

    await userEncontrado.update(body)
    
    return userEncontrado
}


module.exports = {
    updateUser
}