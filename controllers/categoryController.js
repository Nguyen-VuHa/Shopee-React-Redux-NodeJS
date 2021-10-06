const { Category, CateProduct } =  require('../models/bosuutap');
const Product = require('../models/sanpham');
const ImageProduct = require('../models/hinhanh_sanpham');
const { cloudinary } = require('../untils/cloudinary');
const { QueryTypes } = require('sequelize');
const db = require('../models/database');

class categoryController { 
    // [POST] /category/new-category
    async newCategory(req, res) {
        const { nameCategory, imageCategory, listProduct } = req.body;
        var uploadResponse = '';

        const checkNameCategory = await Category.findAll({
            where: {
                nameCategory: nameCategory,
            }
        })

        if(checkNameCategory.length > 0) {
            res.json({warning: 'warning', message: 'Category Name Already Exists!'})
        }
        else {
            try {
                if (imageCategory) {
                    uploadResponse = await cloudinary.uploader.upload(imageCategory, {
                        upload_preset: 'category_image',
                    });
                }
    
                let category = await Category.create({
                    nameCategory: nameCategory,
                    imageUrl: uploadResponse?.url,
                });
        
                for (var i in listProduct) {
                    let temp = await Product.findByPk(listProduct[i]);
                    category.addSANPHAM(temp);
                }

                const dataReponse = await Category.findOne({
                    include: [Product],
                    where: {
                        nameCategory: nameCategory,
                    }
                })
                
                res.json({status: 'OK', dataReponse: {
                    idCategory: dataReponse.idCategory,
                    nameCategory: dataReponse.nameCategory,
                    urlImage: dataReponse.imageUrl,
                    countProduct: listProduct.length,
                }});

            } catch (err) {
                console.log(err);
            }
        }
    }

    // [GET] /category
    async getAllCategory(req, res) {
        const data = await Category.findAll({  include: {
            model: Product,
          }});
        const objData = [];

        data.forEach(item => {
            objData.push({
                idCategory: item.idCategory,
                nameCategory: item.nameCategory,
                urlImage: item.imageUrl,
                countProduct: item.SANPHAMs.length,
            })
        })
 
        res.json(objData);
    }

     // [GET] /category/slide
    async getSliderHomePage(req, res) {
        const data = await db.query(
            `SELECT DISTINCT "sp"."idProduct", "sp"."nameProduct", "sp"."price"
            FROM "BOSUUTAPs" AS "bst" JOIN "SANPHAM_BOSUUTAPs" AS "sp_bst" ON "bst"."idCategory" = "sp_bst"."BOSUUTAPIdCategory"
            JOIN "SANPHAMs" AS "sp" ON "sp_bst"."SANPHAMIdProduct" = "sp"."idProduct" 
            WHERE "bst"."nameCategory" = 'Best Sallers'
            `
        , { type: QueryTypes.SELECT });

        const objImage = [];

        for(var item in data) {
            var imgProduct = await Product.findByPk( data[item].idProduct , {
                include: [ImageProduct],
            });
            objImage.push({
                idProduct: imgProduct.HINHANH_SANPHAMs[0].Image_idProduct,
                imageUrl:  imgProduct.HINHANH_SANPHAMs[0].imageUrl,
            });
        }

        var result = [];
        objImage.map((item, index) => {
            if(data.filter(p => p.idProduct === item.Image_idProduct)) {
                result.push(Object.assign(data[index], item));
            }
        })

        res.json(result);
    }

    // [GET] /category/name
    async getNameCategory(req, res) {
        const data = await Category.findAll({
            attributes: ['idCategory', 'nameCategory'], 
        });
 
        res.json(data);
    }

    // [GET] /category/shop-all
    async getCategoryShopAll (req, res) {
        const data = await Category.findAll();

        const objData = [{
            idCategory: 'all',
            nameCategory: 'Tất cả',
        }];

        data.forEach(item => {
            let obj = {
                idCategory: item.idCategory,
                nameCategory: item.nameCategory,
            }
            objData.push(obj)
        })
 
        res.json(objData);
    }

    // [GET] /category/delete/:idCategory
    async deleteCategory(req, res) {
        const { idCategory } = req.params;
        try {
            await Category.destroy({
                where: {
                    idCategory: idCategory,
                },
                include: [Product]
            });
            res.json({status: 'OK'})
        }
        catch(err) {
            res.json({error: err})
        }
    }

     // [GET] /category/:idCategory
     async getCategoryById(req, res) {
        const { idCategory } = req.params;
        try {
            const productView = await db.query(`
                SELECT "sp"."idProduct","sp"."nameProduct","sp"."price","sp"."status" FROM "BOSUUTAPs" AS "bst"
                JOIN "SANPHAM_BOSUUTAPs" AS "sp_bst" ON "bst"."idCategory" = "sp_bst"."BOSUUTAPIdCategory"
                JOIN "SANPHAMs" AS "sp" ON "sp_bst"."SANPHAMIdProduct" = "sp"."idProduct"
                WHERE "bst"."idCategory" = '${idCategory}'
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
           
            res.json(result)
        }
        catch(err) {
            res.json({error: err})
        }
    }

     // [GET] /category/:idCategory
     async getCategoryProduct(req, res) {
        const { idCategory } = req.params;
        const arrayData = [];
        try {
            const data = await Category.findOne({
                where: {
                    idCategory: idCategory,
                },
                include: {
                    model: Product,
                }
            });

            if(data.SANPHAMs) {
                data.SANPHAMs.forEach(item => {
                    let object = {
                        idProduct: item.idProduct,
                        imageUrl: item.imageUrl,
                        nameProduct: item.nameProduct,
                        price: item.price,
                    }
                    arrayData.push(object);
                })
            }
            res.json(arrayData);
        }
        catch(err) {
            res.json({error: err})
        }
    }

     // [POST] category/update-category
     async updateCategory(req, res) {
        const { idCategory , nameCategory, imageCategory, listProduct } = req.body;
        let imageUrl = '';

        if(imageCategory.includes('http')) {
            imageUrl = imageCategory;
        }
        else {
            try {
                if(imageCategory) {
                    const uploadResponse = await cloudinary.uploader.upload(imageCategory, {
                        upload_preset: 'category_image',
                    });
                    imageUrl = uploadResponse.url;
                }
                else
                    imageUrl = '';
            }
            catch(err) {
                console.log(err)
                return;
            }
        }
        try {
            const category = await Category.findOne({
                where: {
                    idCategory: idCategory,
                }
            });
            category.nameCategory = nameCategory;
            category.imageUrl = imageUrl;
    
            await category.save();
            await CateProduct.destroy({
                where: {
                    BOSUUTAPIdCategory: idCategory,
                }
            })

            for (var i in listProduct) {
                let temp = await Product.findByPk(listProduct[i]);
                category.addSANPHAM(temp);
            }

            const data = await Category.findOne({
                include: [Product],
                where: {
                    idCategory: idCategory,
                }
            })
            
            res.json({status: 'OK', dataReponse: {
                idCategory: data.idCategory,
                nameCategory: data.nameCategory,
                urlImage: data.imageUrl,
                countProduct: listProduct.length,
            }});

        }
        catch(err) {
            res.json({error: err})
        }
    }
}

module.exports = new categoryController;