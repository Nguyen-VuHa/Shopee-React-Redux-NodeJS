const { DataTypes } = require('sequelize');
const db = require('./database');
const Product = require('./sanpham');

const ImageProduct = db.define('HINHANH_SANPHAM', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

ImageProduct.belongsTo(Product, { foreignKey: 'Image_idProduct' });
Product.hasMany(ImageProduct, { foreignKey: 'Image_idProduct' });

module.exports = ImageProduct;