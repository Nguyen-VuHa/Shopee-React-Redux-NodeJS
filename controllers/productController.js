const { Category, CateProduct } = require('../models/bosuutap');
const Product = require('../models/sanpham');
const ImageProduct = require('../models/hinhanh_sanpham');
const { cloudinary } = require('../untils/cloudinary');
const db = require('../models/database');
const { QueryTypes } = require('sequelize');

class ProductController { 

    // [GET] /product
    async getAllProduct(req, res) {
        const product = await Product.findAll({
            include: [ImageProduct],
        });
        res.json(product);
    }

     // [GET] /product-detail
     async getProductDetail(req, res) {
        const product = await Product.findAll({
            include: {
                model: ImageProduct,
                attributes: ['imageUrl', 'Image_idProduct', 'id'],
                order: [
                    ['createAt', 'DESC'],
                ]
            },
            attributes: ['idProduct' , 'nameProduct', 'descProduct', 'price'],
        });
        res.json(product);
    }

    // [GET] /product/view
    async getAllProductView (req, res) {
        const productView = await db.query(`
            SELECT "sp"."idProduct","sp"."nameProduct","sp"."price","sp"."status" FROM "SANPHAMs" AS "sp"
        `, { type: QueryTypes.SELECT} );

        const objImage = [];
        for(var index in productView)
        {
            var imageUrl = await ImageProduct.findAll({
                where: {
                    Image_idProduct: productView[index].idProduct,
                }
            });

            objImage.push({
                idProduct: imageUrl[0].Image_idProduct,
                imageUrl: imageUrl[0].imageUrl 
            });
        }

        var result = [];
        objImage.map((item, index) => {
            if(productView.filter(p => p.idProduct === item.Image_idProduct)) {
                result.push(Object.assign(productView[index], item));
            }
        });
        
        res.json(result);
    }

    // [POST] /product/new-product
    async postProduct(req, res) {
        const { data, arrayImage } = req.body;
        try {
            const product = await Product.findByNameProduct(data.name);
            if(product) return res.json({status: 'Warning', message: 'Product already exists!'});

            var arrayUrl = [];
            for(var i = 0; i < arrayImage.length; i++) {
                var uploadResponse = await cloudinary.uploader.upload(arrayImage[i], {
                    upload_preset: 'product_image',
                });
                arrayUrl.push(uploadResponse.secure_url);
            }

            await Product.create({
                nameProduct: data.name,
                descProduct: data.description,
                price: data.price,
                status: data.checked,
            });

            const isKeyProduct = await Product.findByNameProduct(data.name);
            if(arrayUrl.length > 0) {
                for(var item in arrayUrl) {
                    await ImageProduct.create({
                        imageUrl: arrayUrl[item],
                        Image_idProduct: isKeyProduct.idProduct,
                    });
                }    
            }

            const producReponse = await Product.findOne({
                where: {
                    idProduct: isKeyProduct.idProduct
                },
                include: [ImageProduct]
            });
            res.json({status: 'OK', producReponse });
        }
        catch (err) {
            console.log(err);
            res.json(err)
        }
    }

    // [POST] /product/update-status
    async updateStatusProduct (req, res) {
        const { idProduct } = req.body;

        const data = await Product.findByPk(idProduct);
        data.status = data.status === 1 ? 0 : 1;
        data.save();

        res.json({status: 'Success'});
    }

    // [GET] /product/:idProduct
    async getProductById(req, res) {
        const { idProduct } = req.params;
        
        const product = await Product.findByPk(idProduct, {
            include: [ImageProduct],
        });

        res.json(product);
    }

    // [POST]  /product/update/:idProduct
    async postUpdateProduct(req, res) {
        const { idProduct } = req.params;
        const { data ,arrayImage } = req.body;
        var arrayUrl = [];

        
        if(arrayImage.length > 0) {
            await ImageProduct.destroy({
                where: {
                    Image_idProduct: idProduct
                }
            });
        }

        try {
            for(var index in arrayImage) { 
                if(arrayImage[index].includes('http'))
                    arrayUrl.push(arrayImage[index]);
                else {
                    const uploadResponse = await cloudinary.uploader.upload(arrayImage[index], {
                        upload_preset: 'product_image',
                    });
                    arrayUrl.push(uploadResponse.secure_url);
                }
            }

            await Product.update({
                nameProduct: data.name,
                descProduct: data.description,
                price: data.price,
                status: data.checked,
            }, {
                where: {
                    idProduct: idProduct,
                }
            });

            if(arrayUrl.length > 0) {
                for(var item in arrayUrl) {
                    await ImageProduct.create({
                        imageUrl: arrayUrl[item],
                        Image_idProduct: idProduct,
                    });
                }    
            }
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
        res.json({status: 'OK'});
    }

    // [GET] /product/search?query_search...
    async getProductByQuery (req, res) {
        const { query_search } = req.query;
        const dataSearch = await Product.filterByProductName(query_search);
     
        res.json({status: 'success', data: dataSearch});
    }

}


module.exports = new ProductController;