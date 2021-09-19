const { DataTypes } = require('sequelize');
const db = require('./database');


const Account = db.define('TAIKHOAN', {

    id_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberphone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avartar: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    refreshToken: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    }
});

Account.findByEmail = async function (email) {
    return Account.findOne({
        where: {
            email: email,
        },
    });
}

Account.findByRefreshToken = async function (refreshToken) {
    return Account.findOne({
        where: {
            refreshToken: refreshToken,
        },
    });
}

Account.findById = async function (id_user) {
    return Account.findByPk(id_user);
}

Account.finbByAll = async function () {
    return Account.findAll();
}

module.exports = Account;