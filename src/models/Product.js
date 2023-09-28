const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNul: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNul: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNul: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNul: false,
      },
      sales: {
        type: DataTypes.INTEGER,
        allowNul: false,
      },
      stock: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNul: false,
        defaultValue: [],
      },
    },
    { timestamps: true }
  );
};
