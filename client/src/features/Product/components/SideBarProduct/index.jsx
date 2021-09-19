import React, { useEffect } from 'react';
import { Card, CardBody, UncontrolledCollapse } from 'reactstrap';
import $ from 'jquery';
import PropTypes from 'prop-types';

const SideBarProduct = (props) => {

    useEffect(() => {
        $('.filter-category').on('click', function() {
            if($(this).find('.fa-plus').length > 0) {
                $(this).find('.fal').removeClass('fa-plus');
                $(this).find('.fal').addClass('fa-minus');
            }
            else {
                $(this).find('.fal').removeClass('fa-minus');
                $(this).find('.fal').addClass('fa-plus');
            }
        })
    }, []);

    const handleClickItem = (idCategory, e) => {
        $(e.target).addClass('active').siblings().removeClass('active');
        props.handleFilterCategory(idCategory);
    }
    
    return (
        <div className="content-filter">
            <div className="header-filter">Bộ lọc tìm kiếm</div>
            <ul>
                <li className="filter-item">
                <button className="btn filter-category" id="category">
                    <div className="name">Bộ Sưu Tập</div>
                    <div className="icon">
                        <i className="fal fa-plus"></i>
                    </div>
                </button>
                <UncontrolledCollapse toggler="#category" className="tab-category">
                    <ul>
                        {props.listCategory.map(function(data, index) {
                            if(data.idCategory === 'all') {
                                return <li className="child-item active" key={index} onClick={(e) => handleClickItem(data.idCategory , e)}>
                                {data.nameCategory}
                                </li>
                            }
                            else {
                                return <li className="child-item" key={index} onClick={(e) => handleClickItem(data.idCategory , e)}>
                                    {data.nameCategory}
                                </li>
                            }
                        })}
                    </ul>
                </UncontrolledCollapse>
                </li>
                <li className="filter-item">
                <button className="btn filter-category" id="price">
                    <div className="name">Giá bán</div>
                    <div className="icon">
                        <i className="fal fa-plus"></i>
                    </div>
                </button>
                <UncontrolledCollapse toggler="#price" className="tab-price">
                    <Card>
                        <CardBody>
                           Giá Bán
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>
                </li>
            </ul>
        </div>
    )
};


SideBarProduct.propTypes = {
    listCategory: PropTypes.array.isRequired,
    handleFilterCategory: PropTypes.func,
};


export default SideBarProduct;
