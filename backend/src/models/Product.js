const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      image: {
        type: DataTypes.STRING,
        allownull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allownull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allownull: false,
      },
      unitsSold: {
        type: DataTypes.INTEGER,
        allownull: false,
        defaultValue: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
        allownull: false
      },
      stock: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allownull: false,
        defaultValue: [],
      },
      priceOnSale: {
        type: DataTypes.FLOAT,
      },
    },
    { timestamps: true }
  );
};