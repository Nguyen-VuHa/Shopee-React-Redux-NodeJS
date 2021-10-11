const Messages = require('../models/messages');
const { Op } = require("sequelize");
const Accounts = require('../models/taikhoan');

class MessageController {  

    async getMessageRoom (req, res) {
        const { senderId, receiverId } = req.params;
        const data = await Messages.findAll({
            where: {
                [Op.or]: [
                    { sender_id: senderId },
                    { sender_id: receiverId },
                ]
            },
            attributes: ['messageType', 'messageText', 'createdAt', 'sender_id'],
            order: [
                ['createdAt', 'ASC'],
            ]
        });

        res.json(data);
    }

    async createMessage (req, res) {
        const data = req.body;

        Messages.create({
            sender_id: data.sender_id,
            conversation_id: data.conversation_id,
            messageType: data.messageType,
            messageText: data.messageText,
        });

        res.json({status: 'success'});
    }

    async getIdAdmin (req, res) {
        const data = await Accounts.findOne({
            where: {
                role: 'admin'
            }
        });
 
        res.json({status: 'success', idAdmin: data.id_user});
    }
}

module.exports = new MessageController