const createOrder = require("../controllers/PaymentController/createOrder")


const createOrderHandler = async (req, res) => {
    try {
        const orderMP = await createOrder(req.body)
        res.status(200).json(orderMP)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const successHandler = async (req, res) => {
    try {
        const info = req.query;
        const infoJSON = JSON.stringify(info);
        res.status(200).redirect(`https://frontend-ladyfitlovers.vercel.app/paymentState/?data=${encodeURIComponent(infoJSON)}`);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const updateStockHandler = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json(req.body)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const webhookHandler = async (req, res) => {
    try {
        console.log(req.body);
        const transactionId = req.query.id;

        res.status(200).json({ message: 'Pago aprobado exitosamente', transactionId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    createOrderHandler,
    successHandler,
    webhookHandler,
    updateStockHandler
}