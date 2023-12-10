require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const { DB_DEPLOY } = process.env;


const sequelize = new Sequelize(DB_DEPLOY, {
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/prueba`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { User, Product, Category, PurchaseHistory, Cart, Order, Review } = sequelize.models;


User.belongsToMany(Review, { through: "userreview", as: "Reviews" });
Review.belongsToMany(User, { through: "userreview", as: "User" });

Product.belongsToMany(Review, { through: "productreview", as: "Reviews" });
Review.belongsToMany(Product, { through: "productreview", as: "Product" });

Product.belongsTo(Category);
Category.hasMany(Product);

Cart.belongsTo(User)
User.hasOne(Cart)

User.belongsToMany(Product, { through: 'FavoriteProduct', as: 'FavoriteProducts' });
Product.belongsToMany(User, { through: 'FavoriteProduct', as: 'FavoritedBy' });

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
