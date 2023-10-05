const createOrder = require("../controllers/PaymentController/createOrder")


const createOrderHandler = async (req, res) => {
    try {
        const orderMP = await createOrder(req.body)
        res.status(200).json(orderMP)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const successHandler = async (req, res) => {
    try {
        console.log(req.query);
        // console.log(req.body);
        const response = res;
        res.status(200).json(response)
        // res.redirect('http://localhost:5173/')
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const updateStockHandler = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json(req.body)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const webhookHandler = async (req, res) => {
    try {
        console.log(req.query);
        res.status(200).send(req.query)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    createOrderHandler,
    successHandler,
    webhookHandler,
    updateStockHandler
}