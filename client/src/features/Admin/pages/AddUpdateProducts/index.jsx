import { unwrapResult } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import ToastMessage from 'components/ToastMessage/toastmessage';
import { postNewProduct, postUpdateProduct } from 'features/Admin/adminSlice';
import ModalAddi from 'features/Admin/components/ModalAdditional';
import LoadingSubmit from 'features/Admin/components/ModalLoadingSubmit';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import './customProduct.scss';

const CustomProduct = () => {
    // useState chung 
    const [isHandle, setisHandle] = useState(false);
    const [imageProduct, setImageProduct] = useState('');
    const [price, setPrice] = useState('');
    const [additional, setAdditional] = useState([]);
    const [count, setCount] = useState(0);
    const [isUpdateModal, setisUpdateModal] = useState(null);
    const [dataForm, setdataForm] = useState({
        nameProduct: '',
        desc: '',
    });

    const [validImage, setvalidImage] = useState(true);
    const [validNameProduct, setvalidNameProduct] = useState(true);
    const [validPrice, setvalidPrice] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();
    // sự kiện chung
    const handleOpenDialog = () => {
        $('.choose-image').click();
    }

    const handleOnChangeImg = (e) => {
        let files = e.target.files;
        if(files.length !== 0)
        {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
    
            reader.onload = (e) => {
                setImageProduct(e.target.result);
                setvalidImage(true);
            }
        }   
    }

    const handleRemoveImage = () => {
        setImageProduct(null);
    }
    // update product
    const params = useParams();

    useEffect(() => {
        if(JSON.stringify(params) !== '{}') 
        {
            const fecthDataProduct = async () => {
                const data = await adminApi.getProductById(params);
                setImageProduct(data.product.imageUrl);
                setdataForm({
                    nameProduct: data.product.nameProduct,
                    desc: data.product.descProduct,
                })
                setPrice(data.product.price);
                setAdditional(data.additional);
                setCount(data.additional.length);
            }

            fecthDataProduct();
        }
    }, [params, dispatch]);

    const handleUpdateProduct = async () => {
        if($('.price-product').val() && imageProduct && dataForm.nameProduct){
            setisHandle(true);
            try {
                var objData = {
                    idProduct: params.idProduct,
                    info: {
                        nameProduct: dataForm.nameProduct,
                        descProdcut: dataForm.desc,
                        price: price
                    },
                    imageB64: imageProduct,
                    additional,
                }
                const actionResult = await dispatch(postUpdateProduct(objData));
                const messageResult = unwrapResult(actionResult);
                if(messageResult === 'OK') {
                    toast.success(<ToastMessage title='Successfully!' message='Cập nhật thành công!' type='success'/>);
                    setisHandle(false);
                    history.push('/admin/product');
                }
                else {
                    toast.warn(<ToastMessage title='Warning!' message={messageResult.message} type='warning'/>);
                }
                
            }
            catch(err)
            {
                console.log('Failed to add product', err);
            }
        }
        else {
            isChecked();
        }
    }

    // add product
    const handleClickAdd = () => {
        OpenModal();
        setisUpdateModal(null);
    }

    function OpenModal () {
        $('.modal-open').removeClass('hidden');
        $('.addi-modal').removeClass('cancel');
    }

    const handleOnChange = (e) => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            if(e.target.value !== '')
            {
                setvalidPrice(true);
            }
           setPrice(e.target.value)
        }
    }

    const handleValuesModal = (values) => {
        let arrayTemp = additional;
        arrayTemp.push(values);

        setCount(arrayTemp.length);
        setAdditional(arrayTemp);
    }
    
    const handleUpdateValues = (values) => {
        let arrayTemp = additional;
        for(var i = 0; i < arrayTemp.length; i++)
        {
            if(i.toString() === values.index)
            {
                arrayTemp[i] = values.data;
            }
        }
        setAdditional(arrayTemp);
    }
   
    useEffect(() => {
            if(count > 0)
            {
                $(`.if-content__item`).on('click', function(e) {
                    const index = $(this).attr('index-target');
                    OpenModal();
                    setisUpdateModal({
                        index: index,
                        data: additional[index],
                    });
                })
            }   
            else 
                setisUpdateModal(null);
    }, [count, additional]);

    const handleRemoveItem = (index) => {
       
        const item = additional[index];
        setAdditional((additional.filter(i => i !== item)));
        setCount((additional.filter(i => i !== item)).length);
    } 

    function isChecked() {
        if(!$('.price-product').val())
        {
            setvalidPrice(false);
        }
        if(!imageProduct)
        {
            setvalidImage(false);
            toast.warn(<ToastMessage title='Warning!' message='Bạn chưa chọn hình ảnh cho sản phảm!' type='warning'/>);
        }
        if(!dataForm.nameProduct)
        {
          setvalidNameProduct(false);
        }
    }

    async function handleSubmitForm (){  
        if($('.price-product').val() && imageProduct && dataForm.nameProduct){
            setisHandle(true);
            try {
                var objData = {
                    info: {
                        nameProduct: dataForm.nameProduct,
                        descProdcut: dataForm.desc,
                        price: price
                    },
                    imageB64: imageProduct,
                    additional,
                }
                // const actionResult = await dispatch(postNewProduct(objData));
                // const messageResult = unwrapResult(actionResult);

                // if(messageResult === 'OK') {
                //     toast.success(<ToastMessage title='Successfully!' message='Sản phẩm đã được lưu!' type='success'/>);
                //     setisHandle(false);
                //     history.push('/admin/product');
                // }
                // else {
                //     toast.warn(<ToastMessage title='Warning!' message={messageResult.message} type='warning'/>);
                // }
                
            }
            catch(err)
            {
                console.log('Failed to add product', err);
            }
        }
        else {
            isChecked();
        }
    }
   
    const handleOnChangeForm = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setdataForm({
            ...dataForm,
            [name]: value,
        })
        if(target.name === 'nameProduct')
        {
            setvalidNameProduct(true);
        }
    }

    const handleCancelForm = () => {
        history.goBack();
    }

    return (
        <form className="productUD">
            {isHandle === true ? <LoadingSubmit /> : ''}
            <SimpleBar forceVisible="y" autoHide={false} style={{maxHeight: '100%'}}>
                <Container className="productUD__content">
                    <div className="productUD__left">
                        <div className="group__pd-photo">
                            <div className="group__pd-photo__header">
                                <h4>Hình ảnh sản phẩm</h4>
                            </div>
                            <div className="group__pd-photo__content">
                                <input type="file" className="choose-image" onChange={handleOnChangeImg} hidden/>
                                <div className={validImage ? "image-pd-update" : "image-pd-update is-valid"}>
                                    {
                                        imageProduct ?  
                                        <>
                                            <img className="img-pd" src={imageProduct} alt="NotImage"/>
                                            <div className="btn-close" onClick={handleRemoveImage}></div> 
                                        </>
                                        :
                                        <div className="pd-dialog">
                                            <div className="btn-dialog" onClick={handleOpenDialog}>
                                                <i className="fal fa-plus"></i>
                                            </div>
                                        </div> 
                                    }
                                </div>
                            </div> 
                        </div> 
                        <div className="group__pd-info">
                            <div className="group__pd-photo__header">
                                <h4>Thông tin sản phẩm</h4>
                            </div>
                            <div className="group__pd-info__content">
                                <Row className="row-info">
                                    <Col md={7}>
                                    <FormGroup>
                                        <Label>Tên Sản Phẩm</Label>
                                        <Input autoComplete="off" type="text" name="nameProduct" placeholder="Thêm tên sản phẩm" onChange={handleOnChangeForm}
                                            className={validNameProduct ? '' : 'is-invalid'} value={dataForm.nameProduct}
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                    <FormGroup>
                                        <Label>Giá</Label>
                                        <Input autoComplete="off" type="text" name="price" value={price} onChange={handleOnChange}
                                            className={validPrice ? 'price-product' : 'price-product is-invalid'}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup className="form-textarea">
                                    <Label >Mô tả sản phẩm</Label>
                                    <Input  autoComplete="off" type="textarea" name="desc" style={{height: '100px'}} onChange={handleOnChangeForm} value={dataForm.desc}/>
                                </FormGroup>
                            </div>
                            <div className="group__pd-info__footer">
                                <div className="info-additional">
                                    <span>Mục thông tin bổ sung</span>
                                    <ul className="info-additional__content" id="info-container">
                                        { additional.length > 0 ? 
                                            additional.map(function(data, index) {
                                                return <li className="if-content__item" index-target={index} key={index}>
                                                            <div className="row">
                                                                <div className="name-addi col-md-4" style={{paddingLeft: '20px'}}>
                                                                    {data.title}
                                                                </div>
                                                                <div className="text-addi col-md-8">
                                                                    {data.desc}
                                                                </div>
                                                            </div>
                                                        </li>
                                            })
                                        : <li className="if-content__item not-event">
                                            <p>
                                                Chia sẻ những thông tin như chính sách trả hàng và hướng dẫn chăm sóc với khách hàng của bạn.
                                            </p>
                                        </li>}
                                    </ul>
                                    <div className="btn-add__additional" onClick={handleClickAdd}>
                                        <i className="fal fa-plus"></i>
                                        Thêm mục thông tin
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productUD__right">
                    </div>
                </Container>
                <div className="productUD__footer">
                    <div className="group-btn">
                        <div type="button" className="btn btn-cancel-pd" onClick={handleCancelForm}>
                            Hủy
                        </div>
                        <div type="button" className="btn btn-save-pd" onClick={JSON.stringify(params) !== '{}' ? handleUpdateProduct  : handleSubmitForm} >
                            Lưu Lại
                        </div>
                    </div>
                </div>
            </SimpleBar>
            <ModalAddi handleValuesModal={handleValuesModal} isUpdateModal={isUpdateModal} handleRemoveItem={handleRemoveItem} handleUpdateValues={handleUpdateValues}/>
        </form>
    );
};


CustomProduct.propTypes = {

};


export default CustomProduct;
