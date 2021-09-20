import * as adminSlice from 'features/Admin/adminSlice';
import ProductControlAd from 'features/Admin/components/ProductControlAd';
import ProductItemAd from 'features/Admin/components/ProductItemAd';
import ProductListAd from "features/Admin/components/ProductListAd";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from 'react-spinners';
import SimpleBar from 'simplebar-react';

const Product = () => {
    const stateProducts = useSelector((state) => state.adminProduct);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminSlice.getAllProducts());
    }, [dispatch]);
   
    const showProducts = (stateProducts) => {    
        var result = null;

        if(stateProducts.products.length > 0)
        {
            result = stateProducts.loading ?  
                <div className="layout-loading">
                    <div className="loading-page">
                        <PuffLoader color="#bc4c2a" loading={true} size={70}/>
                    </div>
                </div>
            : stateProducts.products.map((product, index) => {
                return <ProductItemAd 
                            key={index} 
                            product={product}
                            index={index}
                        />
            })
        }
        else {
            result = <li className="item-table not-product">
                        <h3>Không có sản phẩm nào trong kho</h3>
                    </li>
        }
        return result;
    }
   
    return (
        <SimpleBar forceVisible="y" autoHide={false} style={{maxHeight: '100%'}}>
            <div className="ad-products">
                <ProductControlAd productCount={stateProducts.products ? stateProducts.products.length : 0}/>
                <div className="pd-content">
                    <ul className="pd-content__list"> 
                        <li className="item-list">
                            <div className="item__filter"></div>
                        </li>
                        <li className="item-list list-header">
                            <div className="item-list__header">
                                <div className="dyamic-width">
                                    <div className="pd-name">Tên sản phẩm</div>
                                </div>
                                <div className="static-width">
                                    <div className="pd-hd pd-sku">Mã Sản Phẩm</div>
                                    <div className="pd-hd pd-price">Giá</div>
                                    <div className="pd-hd pd-inventory">Tồn kho</div>
                                    <div className="pd-hd pd-option"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ProductListAd>
                        { showProducts(stateProducts) }
                    </ProductListAd>
                </div>
            </div>
        </SimpleBar>
    );
};


Product.propTypes = {

};


export default Product;
