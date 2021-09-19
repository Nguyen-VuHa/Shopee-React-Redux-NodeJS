const { DataTypes } = require('sequelize');
const db = require('./database');
const Product = require('./sanpham');

const Category = db.define('BOSUUTAP', {
    idCategory: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nameCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

const CateProduct = db.define('SANPHAM_BOSUUTAPs', {});

Category.belongsToMany(Product, { through: "SANPHAM_BOSUUTAPs" });
Product.belongsToMany(Category, { through: "SANPHAM_BOSUUTAPs" });

Category.findByIdCategory = async function (idCategory) {
    return Category.findByPk(idCategory);
}

module.exports = {Category, CateProduct};