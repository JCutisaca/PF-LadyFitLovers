const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      orderDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("En proceso", "Entregada", "Cancelada"),
        allowNull: false,
        defaultValue: "En proceso"
      },
      shippingType: {
        type: DataTypes.ENUM("Envío a domicilio", "Retiro en punto de entrega"),
        allowNull: false
      },
      shippingCost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      mercadopagoTransactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};