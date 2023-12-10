const { Category } = require('../../db')

const postCategory = async ({category}) => {
    if (!category) throw Error("Category is missing.")
    
    const categoryName = category.toUpperCase()

    const findCategory = await Category.findOne({where: {name: categoryName}})
    if (findCategory) throw new Error('Category already exists.')

        await Category.create({name: categoryName})
        return "Category has been created.";
}

module.exports = postCategory;