const { User } = require('../../db')

const updateUser = async({id}, {name, surname , email ,phone ,password, address }) => {
    console.log(id);
    console.log(name);
    const userEncontrado = await User.findByPk(id) 
    if(!name?.length|| !surname?.length|| !email?.length||!phone?.length||!password?.length|| !address?.length) {
        console.log("No se pueden guardar vacios");
        return "No se pueden guardar vacios"
    }  else {

            await userEncontrado.update({name, surname, email, phone, password,address}) 
            // await userEncontrado.save()
            return userEncontrado
    
    }

    // console.log(userEncontrado);
}


module.exports = {
    updateUser
}