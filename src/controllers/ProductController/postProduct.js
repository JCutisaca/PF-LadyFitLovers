const { Product } = require("../../db");

const createProduct = async ({ name, image, price, sales, stock, onSale }) => {
  const product = { name, image, price, sales, stock, onSale };

  const create = await Product.create(product);

  return create;
};

module.exports = {
  createProduct,
};
