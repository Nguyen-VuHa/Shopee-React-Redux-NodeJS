import React from 'react';

const MdCateProductItem = (props) => {
    const { data, handleChooseItem, isChecked } = props;
    
    const handleToggleChecked = () => {
        handleChooseItem(data.idProduct);
    }

    return (
        <li className="product-row" onClick={() => handleToggleChecked()}>
            <div className="wrapper">
                <div className="media-container">
                    <img src={data.imageUrl} alt="NotImage"/>
                </div>
                <span>{data.nameProduct}</span>
                <div className="checkbox">
                    <label>
                        <span className={isChecked ? "checkbox-inner checked" : "checkbox-inner"}>
                            <i className="fas fa-check"></i>
                        </span>
                    </label>
                </div>
            </div>
        </li>
    );
};


MdCateProductItem.propTypes = {

};


export default MdCateProductItem;
