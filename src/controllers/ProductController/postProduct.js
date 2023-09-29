const { Product, Category } = require("../../db");

const createProduct = async ({ name, image, price, sales, stock, priceOfOffert, category }) => {
  if (!(name || image || price || sales || stock || category)) throw Error("Faltan datos")

  const findCategory = await Category.find({where: {
    name: category
  }})

  if(!findCategory) throw Error('Falta seleccionar la categoria')
  
  const create = await Product.create({
    name: name,
    image: image,
    price: price,
    sales: sales,
    stock: stock,
    priceOfOffert: priceOfOffert? priceOfOffert : null
  });
  await create.setCategory(findCategory);

  return create;
};

module.exports = {
  createProduct,
};
