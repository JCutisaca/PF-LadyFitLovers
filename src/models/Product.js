const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
        allowNull: false,
        defaultValue: [],
      },
      priceOnSale: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

    },
    { timestamps: true }
  );
};
