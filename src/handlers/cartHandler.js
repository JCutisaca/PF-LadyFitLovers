const { User , ShoppingCart} = require("../db")


const { addItem } = require("../controllers/CartController/addItem")

const addItemHandler = (req, res) => {
    try {
        const {idUser, idProduct} = req.params
        addItem(idUser, idProduct, req.body)
        
        // const {idUser, idProduct } = req.params

        // const respuesta = addItem(idUser, idProduct)
        
        
        // res.status(200).json(respuesta)
    } catch (error) {
        
    }
}



module.exports = {
    addItemHandler,
}