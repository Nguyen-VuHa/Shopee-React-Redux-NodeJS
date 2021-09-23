import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MdCateControl from './components/MdCateControl';
import MdCateProductList from './components/MdCateProductList';
import MdCateSearch from './components/MdCateSearch';
import { useDispatch } from 'react-redux';
import './modal-category.scss';
import { setItemProduct } from './modalCategorySlice';

const ModalCategory = (props) => {
    const stateProduct = useSelector((state) => state.adProducts);
    const stateListChecked = useSelector((state) => state.modalChecked);
    const [listProduct, setlistProduct] = useState([]);
    const [listChooseProduct, setlistChooseProduct] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setlistProduct(stateProduct?.products);
    }, [stateProduct]);

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
        setlistProduct(stateProduct?.products);
        props.handleSearch('');
    }

    const handleSubmitModal = () => {
        const action = setItemProduct(listChooseProduct);
        dispatch(action);
        closeModal();
        setlistChooseProduct([]);
    }

    const handleChooseItem = (idProduct) => {
        var newList = listChooseProduct;
       
        if(listChooseProduct.includes(idProduct)) {
            setlistChooseProduct(newList.filter(id => id !== idProduct));
        } else {
            newList.push(idProduct);
            setlistChooseProduct(newList);
        }
    }

    const hanldeSearchProduct = (q) => {
        if(q)
            setlistProduct(listProduct.filter(u => u.nameProduct.toLowerCase().indexOf(q.toLowerCase()) !== -1));
        else 
            setlistProduct(stateProduct?.products);
    }

    return (
        <div className="modal-open hidden">
        <div className="category-modal-bg">
            <div className="category-modal cancel">
                <div className="categoryInfo">
                    <header className="category-modal-title">
                        <h1>Thêm sản phẩm vào bộ sưu tập</h1>
                        <div className="btn-close-modal" onClick={() => handleCloseModal()}>
                            <i className="fal fa-times-circle"></i>
                        </div>
                    </header>
                    <section className="category-modal-content">
                    <MdCateSearch 
                        handleSearch={props.handleSearch}
                        handleRemoveText={handleRemoveText}
                        hanldeSearchProduct={hanldeSearchProduct}
                    />
                    <MdCateProductList 
                        listProduct={listProduct}
                        listChooseProduct={stateListChecked}
                        handleChooseItem={handleChooseItem}
                    />
                    </section>
                    <div className="category-modal-footer">
                        <MdCateControl handleSubmitModal={handleSubmitModal} handleCloseModal={closeModal}/>
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
