const { Category } = require('../../db')

const getAllCategories = async () => {
    const allCategories = await Category.findAll()
    console.log(allCategories);
    return allCategories;
}

module.exports = getAllCategories;