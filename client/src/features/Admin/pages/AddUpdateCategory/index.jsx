import { unwrapResult } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import ToastMessage from 'components/ToastMessage/toastmessage';
import { createCategory, updateCategory } from 'features/Admin/adminCategorySlice';
import { getAllProducts } from 'features/Admin/adminProductSlice';
import EditCateCard from 'features/Admin/components/CategoryComponents/EditCateCard';
import EditCateControl from 'features/Admin/components/CategoryComponents/EditCateControl';
import ModalCategory from 'features/Admin/components/ModalCategory';
import { removeItemProduct } from 'features/Admin/components/ModalCategory/modalCategorySlice';
import LoadingSubmit from 'features/Admin/components/ModalLoadingSubmit';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input, Label } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import './customCategory.scss';

const CustomCategory = () => {
    const stateListChecked = useSelector((state) => state.modalChecked);
    const stateListProduct = useSelector((state) => state.adProducts);
    const [isHandle, setisHandle] = useState(false);
    const [imageCategory, setimageCategory] = useState('');
    const [listRender, setlistRender] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [nameCategory, setnameCategory] = useState('');
    const [isCategoryName, setisCategoryName] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        const action = getAllProducts();
        dispatch(action);
    }, [dispatch]);

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
        const action = removeItemProduct(values);
        dispatch(action);
    }

    const handleCancelForm = () => {
        history.push('/admin/category');
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
                listProduct: stateListChecked,
            }

            const result = await dispatch(createCategory(objectData));
            const messageResult = unwrapResult(result);
            if(messageResult.status === 'success')
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

    const handleSubmitUpdate = async () => {
        if(nameCategory) {
            setisHandle(true);
            let objectData = {
                idCategory: params.idCategory,
                nameCategory: nameCategory,
                imageCategory: imageCategory,
                listProduct: stateListChecked,
            }
            const result = await dispatch(updateCategory(objectData));
            const messageResult = unwrapResult(result);
            console.log(messageResult);
            if(messageResult.status === 'success')
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
                    <div className="ct-content">
                        <div className="group-box ct-content__left">
                            <EditCateControl stateListChecked={stateListChecked} handleOpenModal={handleOpenModal}/>
                            <div className="ct-wrapper-content">
                                {stateListChecked.length > 0 ?
                                    <div className="ct-body">
                                        { 
                                            stateListProduct.products.map(function(data, index) {
                                                return stateListChecked.filter(id => id === data.idProduct).length > 0 &&
                                                    <EditCateCard 
                                                        key={index} 
                                                        handleRemoveItem={handleRemoveItem} 
                                                        index={index} data={data}
                                                    />
                                            })
                                        }
                                    </div>  
                                    :   <div className="ct-empty">
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
                    handleCheckedSubmit={handleCheckedSubmit} 
                    listRender={listRender} 
                    showModal={showModal}
                    setshowModal={setshowModal}
                />
            </SimpleBar>
    );
};


CustomCategory.propTypes = {

};


export default CustomCategory;
