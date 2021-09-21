import React from 'react';
import * as editProduct from 'features/Admin/pages/AddUpdateProducts/editSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';

const ProductItemAd = (props) => {
    const { product } = props;
    const adProduct = useSelector((state) => state.adProducts);
    const disPatch = useDispatch();
    const history = useHistory();
    const url = useRouteMatch();

    const handleRemoveItem = () => {
        // var action = adminSlice.removeItem(product.idProduct);
        // disPatch(action);
    }

    const handleUpdateProduct = (e) => {
        if(e.target.className !== 'fal fa-trash-alt')
        {
            var productById = adProduct.products.filter(p => p.idProduct === product.idProduct);
            const action = editProduct.setItemProduct(productById);
            disPatch(action);
            history.push(`${url.path}/update-product/${product.idProduct}`);
        }
    }
    

    return (
        <li className="item-table" onClick={(e) => handleUpdateProduct(e)}>
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
