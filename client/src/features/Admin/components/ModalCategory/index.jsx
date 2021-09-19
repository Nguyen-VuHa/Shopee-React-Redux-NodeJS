import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './modal-category.scss';
import $ from 'jquery';


const ModalCategory = (props) => {
    const [changeText, setchangeText] = useState('');
    const [listChooseProduct, setlistChooseProduct] = useState([]);
    const typingTimeoutRef = useRef(null);


    useEffect(() => {
        if(props.showModal)
        {
            setlistChooseProduct(props.listRender);
        }
    }, [props.showModal, props.listRender]);

    function closeModal() {
        $('.modal-open').addClass('hidden');
        $('.category-modal').addClass('cancel');
    }

    const handleCloseModal = () => {
        setlistChooseProduct([]);
        props.setshowModal(false);
        closeModal();
    }

    const handleRemoveText = () => {
        setchangeText('');
        props.handleSearch('');
    }

    const handleClick = (values, e) => {
        $(e.currentTarget).find('.checkbox-inner').toggleClass('checked');
        if($(e.currentTarget).find('.checkbox-inner').hasClass('checked') && !$(e.target).closest('.checkbox-inner').length)
        {
            let array = listChooseProduct;
            if(listChooseProduct.filter(item => item.idProduct !== values)){
                array.push({
                    idProduct: values    
                })
            }

            setlistChooseProduct(array);
        }
        else {
            setlistChooseProduct(listChooseProduct.filter(item => item.idProduct !== values));
        }
    }
    

    const handleChecked = (values, e) => {
        $(e.currentTarget).toggleClass('checked');
        if(!$(e.currentTarget).hasClass('checked'))
        {
            let array = listChooseProduct;
            if(listChooseProduct.filter(item => item.idProduct !== values)){
                array.push({
                    idProduct: values    
                })
            }

            setlistChooseProduct(array);
        }
        else {
            setlistChooseProduct(listChooseProduct.filter(item => item.idProduct !== values));
        }
    }

    const handleChangeSearch = (e) => {
        const value = e.target.value;
        setchangeText(value);

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            props.handleSearch(value);
        }, 600);
    }

    const handleSubmitModal = () => {
        props.handleCheckedSubmit(listChooseProduct);
        closeModal();
    }

    return (
        <div className="modal-open hidden">
        <div className="category-modal-bg">
            <div className="category-modal cancel">
                <div className="categoryInfo">
                    <header className="category-modal-title">
                        <h1>Thêm sản phẩm vào bộ sưu tập</h1>
                        <div className="btn-close-modal" onClick={handleCloseModal}>
                            <i className="fal fa-times-circle"></i>
                        </div>
                    </header>
                    <section className="category-modal-content">
                    <div className="search-category">
                        <i className="fal fa-search"></i>
                        <form className="search-wrapper">
                            <input type="text" name="searchCategory" placeholder="Tìm kiếm sản phẩm theo tên..." value={changeText} onChange={handleChangeSearch}/>
                        </form>
                        {changeText ? 
                            <div className="btn-remove" onClick={handleRemoveText}>
                                <i className="fal fa-times-circle"></i>
                            </div> : ''
                        }
                    </div>
                    <ul className="product-list">
                        {props.listProduct.length > 0 ? 
                            props.listProduct.map(function(data, index) {
                                const checkItem = listChooseProduct.filter(item => item.idProduct === data.idProduct);

                                return <li className="product-row" key={index} onClick={(e) => handleClick(data.idProduct, e)}>
                                            <div className="wrapper">
                                                <div className="media-container">
                                                    <img src={data.imageUrla} alt="NotImage"/>
                                                </div>
                                                <span>{data.nameProduct}</span>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" className="check-list" />
                                                        <span className={checkItem.length > 0 ? "checkbox-inner checked" : "checkbox-inner"} dt-target={data.idProduct} onClick={(e) => handleChecked(data.idProduct, e)}>
                                                            <i className="fas fa-check"></i>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                            })
                        : 
                            <li className="product-row-emty ">
                                <h3>Không tìm thấy sản phẩm nào ở đây</h3>
                            </li>
                        }
                    </ul>
                    </section>
                    <div className="category-modal-footer">
                        <div className="group-button">
                            <div className="modal-cancel" onClick={handleCloseModal}>Hủy</div>
                            <div className="modal-save" onClick={handleSubmitModal}>Thêm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};


ModalCategory.propTypes = {
    listProduct: PropTypes.array.isRequired,
    listRender: PropTypes.array.isRequired,
    handleCheckedSubmit: PropTypes.func,
    handleSearch: PropTypes.func,
    showModal: PropTypes.bool,
};

ModalCategory.defaultProps = {
    handleCheckedSubmit: null,
    handleSearch: null,
}


export default ModalCategory;
