import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ContentDetail from './components/Content';
import HeaderDetail from './components/Header';
import './product-detail.scss';
import { getListProduct } from './productDetail';

const ProductDetail = () => {
    const [listProduct, setlistProduct] = useState([]);
    const dispatch = useDispatch();
    const match = useRouteMatch();
    
    useEffect(() => {
        const fectDataProduct = async () => {
            const data = await dispatch(getListProduct());
            setlistProduct(data.payload);
        }
        fectDataProduct();
    }, [dispatch]);

    return (
        <>
            <div className="container ip-content">
                <Switch>
                    {
                        listProduct.length > 0 ?  
                            listProduct.map(function(data, index) {
                                return  <Route exact path={`${match.path}/${data.nameProduct.replaceAll(' ', '-')}`} key={index}>
                                            <HeaderDetail indexList={index} totalIndex={listProduct.length} listProduct={data} allProduct={listProduct}/>
                                            <ContentDetail listProduct={data} />
                                        </Route>
                            })        
                        : ''
                    }
                </Switch>
            </div>
        </>
    );
};


ProductDetail.propTypes = {

};


export default ProductDetail;
