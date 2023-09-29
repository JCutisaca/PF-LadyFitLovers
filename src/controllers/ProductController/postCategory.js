const { Category } = require('../../db')

const postCategory = async ({category}) => {
    if (!category) throw Error("Falta la categoria xd")
    
    const categoryName = category.toUpperCase()

    const findCategory = await Category.findOne({where: {name: categoryName}})
    if (findCategory) throw new Error('Ya existe...')

        await Category.create({name: categoryName})
        return "Se creo la categoria";
}

module.exports = postCategory;