const { Category, CateProduct } = require('../models/bosuutap');
const Product = require('../models/sanpham');
const Additional = require('../models/thongtinbosung');
const { cloudinary } = require('../untils/cloudinary');

class ProductController { 
    // [GET] /product
    async getAllProduct(req, res) {
        const product = await Product.findAll();
        res.json(product);
    }

      // [GET] /list-product
      async getListProduct(req, res) {
        const product = await Product.findAll({
            include: [Additional]
        });
        const arrayData =  [];

        if(product) {
            product.forEach(item => {
                let object = {
                    idProduct: item.idProduct,
                    urlImage: item.imageUrl,
                    nameProduct: item.nameProduct,
                    price: item.price,
                    descProduct: item.descProduct,
                    status: item.status,
                    additional: item.THONGTINBOSUNGs,
                }

                arrayData.push(object);
            })
        }
        
        res.json(arrayData);
    }

    // [POST] /product/new-product
    async postProduct(req, res) {
        const {info , imageB64, additional} = req.body;
        try {
            const uploadResponse = await cloudinary.uploader.upload(imageB64, {
                upload_preset: 'product_image',
            });

            const product = await Product.findByNameProduct(info.nameProduct);

            if(product) return res.json({status: 'failed', message: 'Product already exists!'})

            await Product.create({
                nameProduct: info.nameProduct,
                descProduct: info.descProdcut,
                price: info.price,
                imageUrl: uploadResponse.url,
                status: 1,
            });

            if(additional.length > 0)
            {
                const isKeyProduct = await Product.findByNameProduct(info.nameProduct);

                additional.forEach(item => {
                    Additional.create({
                        title: item.title,
                        desc: item.desc,
                        idProduct: isKeyProduct.idProduct,
                    });
                });           
                res.sendStatus(200);
            }
            else {
                res.sendStatus(200);
            }
        }
        catch (err) {
            console.log(err);
            res.json(err)
        }
    
    }

    // [GET] /product/:idProduct
    async getProductById(req, res) {
        const { idProduct } = req.params;
        
        const product = await Product.findByIdProduct(idProduct);
        const additional = await Additional.findByIdProduct(idProduct);

        const object = {
            product: product,
            additional: additional,
        }

        res.json(object);
    }
    // [POST]  /product/update/:idProduct
    async postUpdateProduct(req, res) {
        const { idProduct } = req.params;
        const {info , imageB64, additional} = req.body;
        let urlImage = '';
        
        if(imageB64.includes('http'))
        {
            urlImage = imageB64;
        }
        else {
            try {
                const uploadResponse = await cloudinary.uploader.upload(imageB64, {
                    upload_preset: 'product_image',
                });
    
                urlImage = uploadResponse.url;
            }
            catch(err) {
                console.log(err);
                return;
            }
        }

        await Product.update({
            nameProduct: info.nameProduct,
            descProduct: info.descProdcut,
            price: info.price,
            imageUrl: urlImage,
        }, {
            where: {
                idProduct: idProduct,
            }
        })

        await Additional.remomveByIdProduct(idProduct);
        
        if(additional.length > 0)
        {

            additional.forEach(item => {
                Additional.create({
                    title: item.title,
                    desc: item.desc,
                    idProduct: idProduct,
                });
            });           
            res.sendStatus(200);
        }
        else {
            res.sendStatus(200);
        }
    }

    // [GET] /product/search?query_search...
    async getProductByQuery (req, res) {
        const { query_search } = req.query;
        const dataSearch = await Product.filterByProductName(query_search);

        console.log(dataSearch);
        const arrayData = [];

        if(dataSearch) {
            dataSearch.forEach(item => {
                let object = {
                    idProduct: item.idProduct,
                    urlImage: item.imageUrl,
                    nameProduct: item.nameProduct,
                    price: item.price,
                    status: item.status,
                }
                arrayData.push(object);
            })
        }
        res.json({status: 'success', data: arrayData});
    }
}


module.exports = new ProductController;