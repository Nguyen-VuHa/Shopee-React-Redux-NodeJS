const Carts = require('../models/giohang');
const Products = require('../models/sanpham');

class CartController { 
    async getCarts (req, res) {
        const idUser = req.userId;
        const data = await Carts.findAll({
            where: {
                Carts_idUser: idUser
            },
            include: [
                Products
            ]
        });

        res.json(data);
    }

    async plusCart (req, res) {
        const idUser = req.userId;
        const { idCarts } =  req.params;
        const data = await Carts.findOne({
            where: {
                id: idCarts,
                Carts_idUser: idUser,
            }
        })

        data.countProduct += 1;
        data.save();
        res.json({status: 'success'});
    }

    async minusCart (req, res) {
        const idUser = req.userId;
        const { idCarts } =  req.params;
        const data = await Carts.findOne({
            where: {
                id: idCarts,
                Carts_idUser: idUser,
            }
        })

        if(data.countProduct == 1)
            res.json({status: 'success'});
        else {
            data.countProduct -= 1;
            data.save();
            res.json({status: 'success'});
        }
    }

    async removeCarts (req, res) {
        const idUser = req.userId;
        const { idCarts } =  req.params;
        await Carts.destroy({
            where: {
                id: idCarts,
                Carts_idUser: idUser,
            }
        })

        res.json({status: 'success'});
    }
}

module.exports = new CartController