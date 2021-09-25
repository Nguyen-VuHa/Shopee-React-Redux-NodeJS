import ContentDetail from 'features/ProductDetail/components/Content';
import HeaderDetail from 'features/ProductDetail/components/Header';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router';

const MainDetailProduct = () => {
    const state = useSelector((state) => state.productsDetail);
    const match = useRouteMatch();  

    useEffect(() => {
        window.scrollTo(0, 0);
        $('.product-store').show('slow');
    }, []);

    return (
        <div>
            {
                state?.products.length > 0 ?  
                    state?.products.map(function(data, index) {
                        return  <Route exact path={`${match.path}/${data.nameProduct.replaceAll(' ', '-')}`} key={index}>
                                    <HeaderDetail 
                                        indexList={index} 
                                        totalIndex={state?.products.length} 
                                        listProduct={data} 
                                        allProduct={state?.products}/>
                                    <ContentDetail 
                                        listProduct={data} 
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
