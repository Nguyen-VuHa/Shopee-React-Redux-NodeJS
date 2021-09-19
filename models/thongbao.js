const { DataTypes } = require('sequelize');
const db = require('./database');
const Account = require('./taikhoan');

const Notification = db.define('THONGBAO', {

    id_noti: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    massage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Notification.belongsTo(Account, {foreignKey: 'id_user'});
Account.hasMany(Notification, {foreignKey: 'id_user'});

Notification.findById = async function (id_noti) {
    return Notification.findByPk(id_noti);
}

Notification.findByUserId = async function (IdUser) {
    return Notification.findAll({
        where: {
            id_user: IdUser,
        },
        order: [
            ['time', 'DESC'],
        ]
    });
}

Notification.finbByAll = async function () {
    return Notification.findAll();
}

module.exports = Notification;