const { DataTypes } = require('sequelize');
const db = require('./database');
const Accounts = require('./taikhoan');

const Messages = db.define('TINNHAN', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    messageType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    messageText: {
        type: DataTypes.STRING(3000),
        allowNull: false,
    }
});

Messages.belongsTo(Accounts, { as: 'conversation', foreignKey: 'conversation_id' });
Messages.belongsTo(Accounts, { as: 'sender', foreignKey: 'sender_id' });

module.exports = Messages;