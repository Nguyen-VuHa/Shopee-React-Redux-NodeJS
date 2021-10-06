import { listNameSelectors } from 'features/Product/productSlice';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UncontrolledCollapse } from 'reactstrap';

const SideBarProduct = (props) => {
    const { handleFilterCategory } = props;
    const listName = useSelector(listNameSelectors.selectAll);

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
        handleFilterCategory(idCategory);
    }

    const handleClickAll = (e) => {
        $(e.target).addClass('active').siblings().removeClass('active');
        handleFilterCategory('all');
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
                        <li className="child-item active" onClick={(e) => handleClickAll(e)}>
                            Tất Cả
                        </li>
                        {listName.map(function(data) {
                            return <li className="child-item" key={data.idCategory} onClick={(e) => handleClickItem(data.idCategory , e)}>
                                {data.nameCategory}
                            </li>
                        })}
                    </ul>
                </UncontrolledCollapse>
                </li>
            </ul>
        </div>
    )
};


SideBarProduct.propTypes = {

};


export default SideBarProduct;
