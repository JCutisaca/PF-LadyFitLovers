const { Category } = require('../../db')

const getAllCategories = async () => {
    const allCategories = await Category.findAll();
    return allCategories;
}

module.exports = getAllCategories;