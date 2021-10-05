const { DataTypes, Sequelize } = require('sequelize');
const db = require('./database');
const Op = Sequelize.Op;

const Product = db.define('SANPHAM', {
    idProduct: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nameProduct: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descProduct: {
        type: DataTypes.STRING(3000),
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Product.findByNameProduct = async function (nameProduct) {
    return Product.findOne({
        where: {
            nameProduct: nameProduct,
        }
    });
}


Product.finbByAll = async function () {
    return Product.findAll();
}

Product.filterByProductName =  async function (query_search) { 
    return Product.findAll({
        where: {
            nameProduct: {
                [Op.iLike]: `%${query_search}%`
            }
        }
    })
}

module.exports = Product;