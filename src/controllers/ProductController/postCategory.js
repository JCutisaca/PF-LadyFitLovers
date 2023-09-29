const { Category } = require('../../db')

const postCategory = async ({category}) => {
    if (!category) throw Error("Falta la categoria xd")
    const categoryName = category.toUpperCase()
    const [createCategory, created] = await Category.findOrCreate({
        where: {
            name: categoryName
        }
    })
    if (created) throw Error('Ya existe...')
    return "Se creo la categoria";
}

module.exports = postCategory;