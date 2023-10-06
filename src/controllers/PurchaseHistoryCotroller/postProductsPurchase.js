const { PurchaseHistory } = require('../../db')

const postProductsPurchase = async ({ userId, products }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const findProductsUser = await PurchaseHistory.findOne({ where: { UserId: userId } });
    if (!findProductsUser) throw Error("Purchase history not found for the user. Please make a purchase first.")
    const updatedProducts = findProductsUser.products ? [...findProductsUser.products, ...products] : products;
    const updateProductsPurchase = await findProductsUser.update({
        products: updatedProducts
    })
    return updateProductsPurchase;
}

module.exports = postProductsPurchase;