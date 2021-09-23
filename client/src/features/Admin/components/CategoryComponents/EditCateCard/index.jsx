import React from 'react';


const EditCateCard = (props) => {
    const { handleRemoveItem, index, data } = props;
    
    return (
        <div className="ct-body__card" >
            <div className="card-header">
                <span className="index">{ index + 1 }</span>
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
    );
};


EditCateCard.propTypes = {

};


export default EditCateCard;
