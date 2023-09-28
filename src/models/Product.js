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
      price: {
        type: DataTypes.FLOAT,
        allownull: false,
      },
      sales: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      stock: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allownull: false,
        defaultValue: [],
      },
      onSale: {
        type: DataTypes.FLOAT,
      },
    },
    { timestamps: true }
  );
};
