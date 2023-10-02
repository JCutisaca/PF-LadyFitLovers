const { User, Cart, Product } = require("../../db")

const addItem = async (idUser, idProduct, { color, size, quantity }) => {
    try {
      const product = await Product.findByPk(idProduct);
      const user = await User.findByPk(idUser, { include: Cart });
      const cart = user.Cart;
  

console.log(user);      for (const clothing of product.stock) {
        if (clothing.color === color) {
          for (let i = 0; i < clothing.sizeAndQuantity.length; i++) {
            if (clothing.sizeAndQuantity[i]?.size === size && clothing.sizeAndQuantity[i]?.quantity >= quantity) {
              await cart.addProducts(product);
              return;
            }
          }
          console.log("No hay suficiente stock disponible.");
          return;
        }
      }
  
      console.log("No se encontró el producto en el stock.");
    } catch (error) {
      console.error("Error al agregar un producto al carrito:", error);
    }
  };
  

// const bsuquedateProduct = await Product.findOne({where: {name: product.name, image: product.image}})

// const carrito = await Cart.addProduct(bsuquedateProduct)

// console.log(bsuquedateProduct);
// console.log(carrito);

// await user.Cart?.addProduct(bsuquedateProduct, {through: { quantity: 1 }})

// console.log("con", user);

   


    // console.log(id);
    // const product = await Product.findByPk(idProduct)
    // const user = await User.findByPk(idUser, {include: ShoppingCart})
    // const cart = user.ShoppingCart


    // await user.addProduct(product)

    // console.log(product);

    // const product = await Product.findByPk(id)

// console.log(cart);



module.exports = {
    addItem
}