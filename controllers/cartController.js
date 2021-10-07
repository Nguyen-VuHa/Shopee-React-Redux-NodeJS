const Carts = require('../models/giohang');
const Products = require('../models/sanpham');

class CartController { 
    async getCarts (req, res) {
        const idUser = req.userId;
        const data = await Carts.findAll({
            where: {
                Carts_idUser: idUser
            },
            attributes: ['id', 'countProduct', 'Carts_idProduct']
        });

        res.json(data);
    }

    async setItemCart (req, res) {
        const idUser = req.userId;
        const { idProduct, countProduct } = req.body;
        var role = '';
        const checkedItem = await Carts.findOne({
            where: {
                Carts_idProduct: idProduct,
                Carts_idUser: idUser,
            },
        })

        if(checkedItem) {
            checkedItem.countProduct += countProduct;

            await checkedItem.save();
            role = 'Update';
        }
        else {
            await Carts.create({
                countProduct: countProduct,
                Carts_idUser: idUser,
                Carts_idProduct: idProduct,
            });
            role = 'Insert';
        }
      
        var data = await Carts.findOne({
            where: {
                Carts_idUser: idUser,
                Carts_idProduct: idProduct,
            },
            attributes: ['id', 'countProduct', 'Carts_idProduct']
        });
        

        res.json({status: 'success', data, role});
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