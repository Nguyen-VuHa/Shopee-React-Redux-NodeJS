import { unwrapResult } from '@reduxjs/toolkit';
import ToastMessage from 'components/ToastMessage/toastmessage';
import * as categorySlice from 'features/Admin/adminCategorySlice';
import CategoryControl from 'features/Admin/components/CategoryComponents/CategoryControl';
import CategoryList from 'features/Admin/components/CategoryComponents/CategoryList';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import './category.scss';

const Category = () => {
    const stateCate = useSelector((state) => state.adCategories);
    const url = useRouteMatch();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        $('.tooltip-backdrop').on('click', function(e) {
            $('.tooltip-backdrop').removeClass('active');
            $('.btn-option').removeClass('active');
            $('.content-option').removeClass('active');
        });
    }, []);

    useEffect(() => {
        const action = categorySlice.getAllCategory();
        dispatch(action);
    }, [dispatch]);

    const handleOpenOption = (e) => {
        $(e.currentTarget).addClass('active');
        $(e.currentTarget).find('.content-option').addClass('active');
        $('.tooltip-backdrop').addClass('active');
    }

    const handleRemoveCategory = async (values) => {
        const result = await dispatch(categorySlice.deleteCategory(values));
        const messageResult = unwrapResult(result);
        if(messageResult.status === 'success')
        {
            toast.error(<ToastMessage title='Infomation' message='Bộ sưu tập đã được xóa!' type='error'/>);
        }
    }

    const handleUpdateCategory = (values) => {
        history.push(`${url.path}/update-category/${values}`);
    }

    return (
        <div className="pd-collection">
            <CategoryControl countCategory={stateCate.categories.objData.length}/>
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
                        <span className="count-collection">{ stateCate.categories.countProduct }</span>
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
                { stateCate.categories.objData && stateCate.categories.objData.map(function(data, index) {
                    return  <CategoryList 
                                key={index} 
                                data={data} 
                                handleRemoveCategory={handleRemoveCategory}  
                                handleUpdateCategory={handleUpdateCategory} 
                                handleOpenOption={handleOpenOption}
                            />
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
