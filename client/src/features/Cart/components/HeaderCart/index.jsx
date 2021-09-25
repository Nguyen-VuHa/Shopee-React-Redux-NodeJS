import React from 'react';


const HeaderCart = (props) => {
    const { handleCart } = props;
    
    return (
        <div className="md-cart">
            <div className="btn-md-close" onClick={ handleCart }>
                <i className="far fa-chevron-left"></i>
            </div>
            <div className="title-cart">
                Giỏ hàng
            </div>
        </div>
    );
};


HeaderCart.propTypes = {

};


export default HeaderCart;
