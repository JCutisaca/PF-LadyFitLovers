const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allownull: false, 
        },
        surname: {
            type: DataTypes.STRING,
            allownull: true,
        },
        email: {
            type: DataTypes.STRING,
            allownull: false
        },
        phone: {
            type: DataTypes.BIGINT,
            allownull: false
        },
        password: {
            type: DataTypes.STRING,
            allownull: false
        },
        typeUser: {
            type: DataTypes.ENUM("Admin", "Moderator", "User"),
            allownull: false
        },
        address: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}