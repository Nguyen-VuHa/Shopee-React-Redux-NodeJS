const { Category, CateProduct } =  require('../models/bosuutap');
const Product = require('../models/sanpham');
const { cloudinary } = require('../untils/cloudinary');

class categoryController { 
    // [POST] /category/new-category
    async newCategory(req, res) {
        const { nameCategory, imageCategory, listProduct } = req.body;
        var uploadResponse = '';
        try {
            if(imageCategory) {
                uploadResponse = await cloudinary.uploader.upload(imageCategory, {
                    upload_preset: 'category_image',
                });
            }

            try{
                let category = await Category.create({
                    nameCategory: nameCategory,
                    imageUrl: uploadResponse?.url,
                });
        
                for (var i = 0; i < listProduct.length; i++) {
                    let temp = await Product.findByIdProduct(listProduct[i]);
                    category.addSANPHAM(temp);
                }
                
                res.json({status: 'success'});
            }
            catch (err) {
                res.json({error: err});
            }
        }
        catch(err) {
            console.log(err);
        }
       
    }

    // [GET] /category
    async getCategory(req, res) {
        const data = await Category.findAll({  include: {
            model: Product,
          }});
        const objData = [];

        const countProduct = await Product.findAll();

        data.forEach(item => {
            objData.push({
                idCategory: item.idCategory,
                nameCategory: item.nameCategory,
                urlImage: item.imageUrl,
                countProduct: item.SANPHAMs.length,
            })
        })
 
        res.json({
            objData: objData,
            countProduct: countProduct.length
        });
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

    // [POST] /category/delete/:idCategory
    async deleteCategory(req, res) {
        const { idCategory } = req.params;
        try {
            await Category.destroy({
                where: {
                    idCategory: idCategory,
                },
                include: [Product]
            });
            res.json({status: 'success'})
        }
        catch(err) {
            res.json({error: err})
        }
    }

     // [GET] /category/:idCategory
     async getCategoryById(req, res) {
        const { idCategory } = req.params;
        try {
            const data = await Category.findOne({
                where: {
                    idCategory: idCategory,
                },
                include: {
                    model: Product,
                }
            });
           
            res.json(data)
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
                const uploadResponse = await cloudinary.uploader.upload(imageCategory, {
                    upload_preset: 'category_image',
                });
                imageUrl = uploadResponse.url;
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

            for (var i = 0; i < listProduct.length; i++) {
                let temp = await Product.findByIdProduct(listProduct[i]);
                category.addSANPHAM(temp);
            }
            
            res.json({status: 'success'});
        }
        catch(err) {
            res.json({error: err})
        }
    }
}

module.exports = new categoryController;