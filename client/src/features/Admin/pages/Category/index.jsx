import adminApi from 'api/adminApi';
import ToastMessage from 'components/ToastMessage/toastmessage';
import { deleteCategory } from 'features/Admin/adminSlice';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import './category.scss';

const Category = () => {
    const [listCategory, setlistCategory] = useState([]);
    const [countCategory, setcountCategory] = useState(0);
    const url = useRouteMatch();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        $('.tooltip-backdrop').on('click', function(e) {
            $('.tooltip-backdrop').removeClass('active');
            $('.btn-option').removeClass('active');
            $('.content-option').removeClass('active');
        })

    }, []);

    useEffect(() => {
        const fecthCategory = async () => {
            const data = await adminApi.getCategory();
   
            setcountCategory(data.countProduct);
            setlistCategory(data.objData);
        }
        fecthCategory();
    }, []);

    const handleOpenOption = (e) => {
        $(e.currentTarget).addClass('active');
        $(e.currentTarget).find('.content-option').addClass('active');
        $('.tooltip-backdrop').addClass('active');
    }

    const handleRemoveCategory = async (values) => {
        const result = await dispatch(deleteCategory(values));

        if(result.payload.status === 'success')
        {
            toast.error(<ToastMessage title='Infomation' message='Bộ sưu tập đã được xóa!' type='error'/>);
            setlistCategory(listCategory.filter(item => item.idCategory !== values));
        }
    }

    const handleUpdateCategory = (values) => {
        history.push(`${url.path}/update-category/${values}`);
    }

    return (
        <div className="pd-collection">
            <div className="pd-collection__header">
                <div className="hd-left">
                    <div>Bộ Sưu Tập</div>
                    <span>{listCategory.length}</span>
                </div>
                <div className="hd-right">
                    <Link to={`${url.path}/new-category`} className="btn btn-add-collection">
                        <i className="fal fa-plus"></i>
                        Bộ sưu tập mới
                    </Link>
                </div>
            </div>
            <div className="pd-collection__content">
                <div className="card-box">
                    <div className="card-bg">
                        <img src="https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="NotImage"/>
                    </div>
                    <div className="card-shadow"></div>
                    <div className="card-content">
                        <div className="name-collection">
                            Tất cả sản phẩm
                        </div>
                        <span className="count-collection">{ countCategory }</span>
                    </div>
                    <div className="card-option">
                        <div className="btn-circle btn-option" onClick={handleOpenOption}>
                            <i className="far fa-ellipsis-h"></i>
                            <div className="group-box content-option">
                                <ul className="list-option">
                                    <li className="item-option">
                                        <i className="fal fa-edit"></i>
                                        Chỉnh sửa
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                { listCategory && listCategory.map(function(data, index) {
                    return   <div className="card-box" key={index}>
                                <div className="card-bg">
                                    <img src={data.urlImage} alt="NotImage"/>
                                </div>
                                <div className="card-shadow"></div>
                                <div className="card-content">
                                    <div className="name-collection">
                                        {data.nameCategory}
                                    </div>
                                    <span className="count-collection">{data.countProduct}</span>
                                </div>
                                <div className="card-option">
                                    <div className="btn-circle btn-option" onClick={handleOpenOption}>
                                        <i className="far fa-ellipsis-h"></i>
                                        <div className="group-box content-option">
                                            <ul className="list-option">
                                                <li className="item-option" onClick={() => handleUpdateCategory(data.idCategory)}>
                                                    <i className="fal fa-edit"></i>
                                                    Chỉnh sửa
                                                </li>
                                                <li className="item-option item-remove" onClick={() => handleRemoveCategory(data.idCategory)}>
                                                    <i className="fal fa-trash-alt"></i>
                                                    Xóa
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                })}
                 <div className="tooltip-backdrop"></div>
                <div className="card-box-add">
                    <Link to={`${url.path}/new-category`}>
                        <div className="btn-circle btn-add-ct">
                            <i className="fal fa-plus"></i>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};


Category.propTypes = {

};


export default Category;
