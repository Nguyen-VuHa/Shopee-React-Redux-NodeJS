const { DataTypes } = require('sequelize');
const db = require('./database');
const Product = require('./sanpham');

const Additional = db.define('THONGTINBOSUNG', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
});

Additional.belongsTo(Product, { foreignKey: 'idProduct' });
Product.hasMany(Additional, { foreignKey: 'idProduct' });

Additional.findByIdProduct = async function (idProduct) {
    return Additional.findAll({
        where: {
            idProduct: idProduct,
        }
    });
}

Additional.remomveByIdProduct = async function(idProduct) {
    console.log(idProduct)
    return Additional.destroy({
        where: {
            idProduct: idProduct,
        }
    })
}

Additional.finbByAll = async function () {
    return Additional.findAll();
}

module.exports = Additional;