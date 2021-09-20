import React from 'react';
import { useDispatch } from 'react-redux';
import adminSlice from 'features/Admin/adminSlice';
import { useHistory, useRouteMatch } from 'react-router';

const ProductItemAd = (props) => {
    const { product, index } = props;
    const disPatch = useDispatch();
    const history = useHistory();
    const url = useRouteMatch();

    const handleRemoveItem = () => {
        console.log(product.idProduct);
        var action = adminSlice.removeItem(product.idProduct);
        disPatch(action);
    }

    const handleUpdateProduct = (values, e) => {
        if(e.target.className !== 'fal fa-trash-alt')
        {
            history.push(`${url.path}/update-product/${values}`);
        }
    }
    

    return (
        <li className="item-table" onClick={(e) => handleUpdateProduct(product.idProduct, e)}>
            <div className="dyamic-width">
                <div className="context-name">
                    <div className="pd-img">
                        <img src={product.imageUrl} alt="NotImage"/>
                    </div>
                    <div className="info-product">
                        <div className="text-name">
                        {product.nameProduct}
                        </div>
                    </div>
                </div>
            </div>
            <div className="static-width">
                <div className="pd-hd context-sku">{product.idProduct}</div>
                <div className="pd-hd context-price">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</div>
                <div className="pd-hd context-inventory">Có hàng trong kho</div>
                <div 
                    className="pd-hd context-option"
                    onClick={() => handleRemoveItem()}
                    >
                    <i className="fal fa-trash-alt"></i>
                </div>
            </div>
        </li>
    );
};


ProductItemAd.propTypes = {

};


export default ProductItemAd;
