const Notification = require("../models/thongbao");

class NotifyController {
    // [GET] /api/notify 
    async getNotify(req, res) {
        const idUser = req.userId;
       
        if(!idUser) return res.sendStatus(401);

        const notifyData = await Notification.findByUserId(idUser);
        if(!notifyData) return res.sendStatus(503);

        res.json({status: 'success', notifyData: notifyData});
    }

     // [GET] /api/count-notify 
     async getCount(req, res) {
        const idUser = req.userId;
        let count = 0;
        if(!idUser) return res.sendStatus(401);

        const notifyData = await Notification.findByUserId(idUser);
        if(!notifyData) return res.sendStatus(503);

        notifyData.forEach(item => {
            if(item.status === 1)
            {
                count += 1;
            }
        });

        res.json({status: 'success', count: count});
    }

    // [POST] /api/update
     async postUpdate(req, res) {
        const idUser = req.userId;
        if(!idUser) return res.sendStatus(401);

        await Notification.update({
            status: 0,
        }, {
            where: {
                id_user: idUser,
                status: 1,
            },
        })
        res.json({status: 'success'});
    }

}

module.exports = new NotifyController;