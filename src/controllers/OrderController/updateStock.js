const { Product } = require('../../db');

const updateStock = async (products) => {
    for (const product of products) {
        const productDB = await Product.findOne({ where: { id: product.id } });
        if (!productDB) throw new Error(`Product with ID ${product.id} not found.`);
        const colorIndex = productDB.stock.findIndex((item) => item.color === product.color);
        if (colorIndex !== -1) {
            const sizeQty = productDB.stock[colorIndex].sizeAndQuantity.find((sizeQty) => sizeQty.size === product.size);
            if (sizeQty) {
                sizeQty.quantity -= product.quantity;
            } else {
                throw new Error(`Size ${product.size} not found in stock for product with ID ${product.id}.`);
            }
            productDB.unitsSold += product.quantity;
            await Product.update({
                stock: productDB.stock,
                unitsSold: productDB.unitsSold,
            }, {
                where: { id: product.id },
            });
        } else {
            throw new Error(`Color ${product.color} not found in stock for product with ID ${product.id}.`);
        }
    }
    return;
};

module.exports = updateStock;
