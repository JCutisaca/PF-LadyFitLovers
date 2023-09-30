const { Product, Category } = require('../../db');
const { getProductById } = require('./getProductById');

const updateProduct = async ({ id, name, image, price, unitsSold, stock, priceOnSale, category }) => {

    if (!id) throw Error("Es necesario el id")

    if (!(name || image || price || unitsSold || stock)) throw Error("Faltan datos");

    const product = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }
    })
    if (!product) throw Error('No se encontro el producto')

    const updateFields = await Product.update({
        name: name ? name : product.name,
        image: image ? image : product.image,
        price: price ? price : product.price,
        unitsSold: unitsSold ? unitsSold : product.unitsSold,
        stock: stock ? stock : product.stock,
        priceOnSale: priceOnSale ? priceOnSale : null
    },
        { where: { id: id } }
    )

    if (category) {
        const newCategory = await Category.findOne({ where: { id: category.id } })
        if (!newCategory) throw Error('No existe la categoria seleccionada')
        await product.setCategory(newCategory);
    }

    await product.update(updateFields);

    const newProductUpdate = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }
    })

    return newProductUpdate;
}

module.exports = {
    updateProduct
}