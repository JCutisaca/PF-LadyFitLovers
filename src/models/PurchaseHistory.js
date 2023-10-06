const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PurchaseHistory",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: true
      }
    },
    { timestamps: true }
  );
};
