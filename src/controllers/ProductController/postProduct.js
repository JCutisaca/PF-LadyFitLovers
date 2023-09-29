const { Product, Category } = require("../../db");

const createProduct = async (productsArray) => {

  const createdProducts = [];
  for (const productData of productsArray) {
    const { name, image, price, unitsSold, stock, priceOnSale, category } = productData;

    if (!(name || image || price || unitsSold || stock || category)) {
      throw Error("Faltan datos");
    }
    const findCategory = await Category.findOne({
      where: {
        name: category
      }
    });

    if (!findCategory) {
      throw Error('Falta seleccionar la categoría');
    }
    const create = await Product.create({
      name: name,
      image: image,
      price: price,
      unitsSold: unitsSold,
      stock: stock,
      priceOnSale: priceOnSale ? priceOnSale : null
    });

    await create.setCategory(findCategory);

    createdProducts.push(create);
  }
  return "Se craron los productos";
};

module.exports = {
  createProduct,
};
