const { Product, Category } = require('../../db');
const { getProductById } = require('./getProductById');

const updateProduct = async ({ id, name, image, price, unitsSold, stock, priceOnSale, category, active, description }) => {

    if (!id) throw Error("Please provide a valid ID.")

    if (!(name || image || price || unitsSold || stock || description || active !== undefined)) throw Error("Data is missing for updating the product.");

    const product = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }
    })
    if (!product) throw Error("Product not found.")
    const updatedActive = active !== undefined ? active : product.active;
    const updateFields = await Product.update({
        name: name ? name : product.name,
        image: image ? image : product.image,
        description: description ? description : product.description,
        price: price ? price : product.price,
        unitsSold: unitsSold ? unitsSold : product.unitsSold,
        stock: stock ? stock : product.stock,
        active: updatedActive,
        priceOnSale: priceOnSale ? priceOnSale : null
    },
        { where: { id: id } }
    )

    if (category) {
        const newCategory = await Category.findOne({ where: { id: category.id } })
        if (!newCategory) throw Error("Selected category does not exist.")
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