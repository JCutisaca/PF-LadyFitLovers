const { Category } = require('../../db')

const updateCategoryName = async ({ id, name }) => {
    if (!id) throw Error("Please provide a valid ID.")
    const findCategory = await Category.findOne({ where: { id } })
    if (!findCategory) throw Error('Category not found.')
        if (!name) throw Error("Category name is missing.")
    const newName = name.toUpperCase()
    const updateCategory = await Category.update({
        name: newName
    },
        { where: { id } }
    )
    return updateCategory;
}

module.exports = updateCategoryName;