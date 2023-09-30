const { Product, Category } = require('../../db')

const updateProduct = async(id, body) => {
    // console.log("aca", id);
    // console.log("por body", name);
    const productByID = await Product.findOne({
        where: { id }, include: [Category], attributes: {
            exclude: ['CategoryId']
        }
    })

    // console.log(body.category);
        const category = await Category.findOne({where: {name: body.category.name}})
        console.log(category);

    await productByID.setCategorie(category)

    // console.log(body.category);
    // let productModificado 
    // if(body.category) {
    //     delete productByID.Category
    //     // console.log("entre");
    //     // productModificado = await productByID.update(category)
    // }
    return productByID



if(body.Cartegory) {
}

    // console.log(productByID);
}

module.exports = {
    updateProduct
}