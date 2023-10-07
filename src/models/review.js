const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      reviewText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },

    { timestamps: true }
  );
};