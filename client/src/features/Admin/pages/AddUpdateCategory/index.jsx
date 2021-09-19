import adminApi from 'api/adminApi';
import ToastMessage from 'components/ToastMessage/toastmessage';
import { createCategory, updateCategory } from 'features/Admin/adminSlice';
import ModalCategory from 'features/Admin/components/ModalCategory';
import LoadingSubmit from 'features/Admin/components/ModalLoadingSubmit';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input, Label } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import './customCategory.scss';

const CustomCategory = () => {
    const [isHandle, setisHandle] = useState(false);
    const [imageCategory, setimageCategory] = useState('');
    const [listProduct, setlistProduct] = useState([]);
    const [listRender, setlistRender] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [nameCategory, setnameCategory] = useState('');
    const [isCategoryName, setisCategoryName] = useState(false);
    let count = 0;
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    
    useEffect(() => {
        const fecthDataProduct = async () => {
            const list = await adminApi.getProduct();
            setlistProduct(list);
        }
        fecthDataProduct();
    }, []);

    useEffect(() => {
        const fecthCategoryById = async () => {
            if(JSON.stringify(params) !== '{}')
            {
                const data = await adminApi.getCategoryById(params.idCategory);
                setimageCategory(data.imageUrl);
                setnameCategory(data.nameCategory);
    
                let array = [];
                data.SANPHAMs.forEach(item => {
                    array.push({
                        idProduct: item.idProduct,
                    })
                });
                setlistRender(array);
            }
        }

        fecthCategoryById();
    }, [params, dispatch]);

    const handleOpenDialog = (e) => {
        let files = e.target.files;
        if(files.length !== 0)
        {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
    
            reader.onload = (e) => {
                setimageCategory(e.target.result);
            }
        }   
    }


    const handleLoadImage = () => {
        $('.choose-image').click();
    }

    const handleRemoveImage = () => {
        setimageCategory('');
    }
    
    const handleOpenModal = () => {
        $('.modal-open').removeClass('hidden');
        $('.category-modal').removeClass('cancel');
        setshowModal(true);
    }

    const handleCheckedSubmit = (values) => {
    
        setlistRender(values);
        setshowModal(false);
    }

    const handleRemoveItem = (values) => {  
        setlistRender(listRender.filter(item => item.idProduct !== values));
    }

    const handleCancelForm = () => {
        history.push('/admin/category');
    }

    const handleSearch = async (values) => {
        const params = {
            query_search: values
        }
        const fetchData = await adminApi.searchProduct(params);

        if(fetchData.data.length > 0)
        {
           setlistProduct(fetchData.data);
        }
        else {
            setlistProduct([]);
        }
    }

    const nameProductChange = (e) => {
        setnameCategory(e.target.value);
        setisCategoryName(false);
    }
    
    const handleSubmitCategory = async () => {
        if(nameCategory) {
            setisHandle(true);
            let objectData = {
                nameCategory: nameCategory,
                imageCategory: imageCategory,
                listProduct: listRender,
            }
            const resultFecth = await dispatch(createCategory(objectData));
            if(resultFecth.payload.status === 'success')
            {
                toast.success(<ToastMessage title='Successfully!' message='Đã thêm bộ sưu tập!' type='success'/>);
                setisHandle(false);
                history.push('/admin/category');
            }
        }
        else {
            setisCategoryName(true);
        }
    }

    const handleSubmitUpdate = async (e) => {
        if(nameCategory) {
            setisHandle(true);
            let objectData = {
                idCategory: params.idCategory,
                nameCategory: nameCategory,
                imageCategory: imageCategory,
                listProduct: listRender,
            }
            const resultFecth = await dispatch(updateCategory(objectData));
            if(resultFecth.payload.status === 'success')
            {
                toast.success(<ToastMessage title='Successfully!' message='Đã cập nhật thành công!' type='success'/>);
                setisHandle(false);
                history.push('/admin/category');
            }
        }
        else {
            setisCategoryName(true);
        }
    }

    return (
            <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '100%' }}>
                {isHandle === true ? <LoadingSubmit /> : ''}
                <form className="category-custom">
                    <div className="ct-header"></div>
                    <div className="ct-content">
                        <div className="group-box ct-content__left">
                            <div className="content-header">
                                <div className="title-hd">
                                    <div className="title">Sản phẩm trong bộ sưu tập</div>
                                    <span>{listRender.length}</span>
                                </div>
                                {listRender.length > 0  ?  <div className="btn btn-hd-add" onClick={handleOpenModal}>
                                                                <i className="fal fa-plus"></i>
                                                                Thêm sản phẩm
                                                            </div>
                                : ''}
                               
                            </div>
                            <div className="ct-wrapper-content">
                                {listRender.length > 0 ?
                                <div className="ct-body">
                                    { 
                                        listProduct.map(function(data, index) {
                                            return listRender.filter(item => item.idProduct === data.idProduct).length > 0 
                                            && <div className="ct-body__card" key={index}>
                                                        <div className="card-header">
                                                            <span className="index">{count += 1}</span>
                                                            <div className="btn-circle btn-remove" onClick={() => handleRemoveItem(data.idProduct)}>
                                                                <i className="fal fa-times"></i>
                                                            </div>
                                                        </div>
                                                        <div className="card-bg">
                                                            <img src={data.imageUrl} alt="NotImage"/>
                                                        </div>
                                                        <div className="card-shadow"></div>
                                                        <div className="card-info">
                                                            <div className="name-product">
                                                                {data.nameProduct}
                                                            </div>
                                                        </div>
                                                    </div>
                                        })
                                    }
                                </div>  
                                : <div className="ct-empty">
                                        <h3>Bắt đầu thêm sản phẩm vào bộ sưu tập</h3>
                                        <span>Thêm một bộ sưu tập để hiển thị trên trang web của bạn.</span>
                                        <div className="btn btn-add-ct" onClick={handleOpenModal}>
                                            <i className="fal fa-plus"></i>
                                            Thêm sản phẩm
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="ct-content__right">
                            <div className="group-box info-ct" >
                                <div className="content-header">
                                    <div className="title">Thông tin bộ sưu tập</div>
                                </div>
                                <div className="content-body">
                                    <div className="form-row">
                                        <Label>Tên bộ sưu tập</Label>
                                        <Input 
                                            autoComplete="off" 
                                            className={isCategoryName ? "nameCategory is-invalid" : "nameCategory"} 
                                            type="text" name="nameCategory" onChange={nameProductChange} value={nameCategory}/>
                                    </div>
                                    <div className="form-row">
                                        <Label>Hình ảnh bộ sưu tập</Label>
                                        <div className="media-button" onClick={imageCategory ? null : handleLoadImage}>
                                            <span className="placeholder">
                                                <i className="fal fa-plus"></i>
                                            </span>
                                            {imageCategory ? 
                                                <>
                                                    <div className="bg-body">
                                                        <img src={imageCategory} className="image" alt="NotImage"/>
                                                    </div> 
                                                    <div className="shadow"></div>
                                                    <div className="group-btn">
                                                        <div className="btn-circle btn-option btn-update" onClick={handleLoadImage}>
                                                            <i className="fal fa-sync-alt"></i>
                                                        </div>
                                                        <div className="btn-circle btn-option btn-remove" onClick={handleRemoveImage}>
                                                            <i className="fal fa-trash-alt"></i>
                                                        </div>
                                                    </div>
                                                </>
                                                : ''
                                            }
                                        </div>
                                        <input type="file" className="choose-image" hidden onChange={handleOpenDialog}/>
                                    </div>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ct-footer">
                        <div className="group-btn">
                            <div type="button" className="btn btn-cancel-pd" onClick={handleCancelForm}>
                                Hủy
                            </div>
                            <div type="button" className="btn btn-save-pd" onClick={JSON.stringify(params) !== '{}' ? handleSubmitUpdate : handleSubmitCategory}>
                                Lưu Lại
                            </div>
                        </div>
                    </div>
                </form>
                <ModalCategory 
                    listProduct={listProduct} 
                    handleCheckedSubmit={handleCheckedSubmit} 
                    listRender={listRender} 
                    handleSearch={handleSearch}
                    showModal={showModal}
                    setshowModal={setshowModal}
                />
            </SimpleBar>
    );
};


CustomCategory.propTypes = {

};


export default CustomCategory;
