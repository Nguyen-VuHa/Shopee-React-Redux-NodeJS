import ContentDetail from 'features/ProductDetail/components/Content';
import HeaderDetail from 'features/ProductDetail/components/Header';
import { productDetailSelectors } from 'features/ProductDetail/productDetail';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router';

const MainDetailProduct = () => {
    const productDetail = useSelector(productDetailSelectors.selectAll);
    const match = useRouteMatch();      

    useEffect(() => {
        window.scrollTo(0, 0);
        $('.product-store').show('slow');
    }, []);

    return (
        <div>
            {
               productDetail.length > 0 ?  
               productDetail.map(function(data, index) {
                        return  <Route exact path={`${match.path}/${data.nameProduct.replaceAll(' ', '-')}`} key={index}>
                                    <HeaderDetail 
                                        indexList={index} 
                                        totalIndex={productDetail.length} 
                                        listProduct={data} 
                                        allProduct={productDetail}/>
                                    <ContentDetail 
                                        data={data} 
                                    />
                                </Route>
                    })        
                : ''
            }
        </div>
    );
};


MainDetailProduct.propTypes = {

};


export default MainDetailProduct;
