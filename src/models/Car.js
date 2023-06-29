const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Car = sequelize.define('car', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //userId
    //productId
});

module.exports = Car;