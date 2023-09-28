const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Color', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUID
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}