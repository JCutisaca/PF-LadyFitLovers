const { Product, Category } = require('../../db');
const { getProduct } = require('./getProduct');

const getProductsFilter = async (size, color, sort) => {
    if(size || color || sort) throw Error('Parameters are required for filtering.')
    let allProducts = await getProduct()
    if (size) {
      allProducts = allProducts.filter(product => {
        return product.stock.some(stockItem => stockItem.size === size);
      });
    }
    if (color) {
      allProducts = allProducts.filter(product => {
        return product.stock.some(stockItem => stockItem.color === color);
      });
    }
    if (sort) {
      switch (sort) {
        case 'priceAsc':
          allProducts = allProducts.sort((a, b) => a.price - b.price);
        case 'priceDesc':
          allProducts = allProducts.sort((a, b) => b.price - a.price);
        case 'moreSales':
            allProducts = allProducts.sort((a, b) => a.unitsSold - b.unitsSold)
        case 'lowerSales':
            allProducts = allProducts.sort((a, b) => b.unitsSold - a.unitsSold)
        default:
          break;
      }
    }
    const products = allProducts;
    return products;
};

module.exports = getProductsFilter;
