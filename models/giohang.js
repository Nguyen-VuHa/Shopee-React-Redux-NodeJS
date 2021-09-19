const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./taikhoan');
const Products = require('./sanpham');

const Carts = db.define('GIOHANG', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    countProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

Carts.belongsTo(Accounts, { foreignKey: 'Carts_idUser' });
Accounts.hasMany(Carts, { foreignKey: 'Carts_idUser' });

Carts.belongsTo(Products, { foreignKey: 'Carts_idProduct' });
Products.hasMany(Carts, { foreignKey: 'Carts_idProduct' });

module.exports = Carts;