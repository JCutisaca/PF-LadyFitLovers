const { Product, Category } = require("../../db");

const createProduct = async (productsArray) => {

  const createdProducts = [];
  for (const productData of productsArray) {
    const { name, image, price, unitsSold, stock, priceOnSale, category } = productData;

    if (!(name || image || price || unitsSold || stock || category)) {
      throw Error("Data is missing for some products.");
    }
    const findCategory = await Category.findOne({
      where: {
        name: category
      }
    });

    if (!findCategory) {
      throw Error("Category selection is missing.");
    }
    const create = await Product.create({
      name: name,
      image: image,
      price: price,
      unitsSold: unitsSold,
      active: true,
      stock: stock,
      priceOnSale: priceOnSale ? priceOnSale : null
    });

    await create.setCategory(findCategory);

    createdProducts.push(create);
  }
  return "Products have been created.";
};

module.exports = {
  createProduct,
};
