import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import SideBarProduct from './components/SideBarProduct';
import './product-store.scss';
import $ from 'jquery';
import WrapperProduct from './components/WrapperProduct';
import { useDispatch } from 'react-redux';
import { getAllCategory, getAllProduct, getCategoryById } from './productStoreSlice';

const ProductStore = () => {
    const [listProduct, setlistProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const dispath = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        $('.product-store').show('slow');
    }, []);

    useEffect(() => {
        const fecthData = async () => {
            const dataProduct = await dispath(getAllProduct());
            const dataCategory = await dispath(getAllCategory());
            setlistProduct(dataProduct.payload);
            setlistCategory(dataCategory.payload);
            setisLoading(false);
        }
       fecthData();
    }, [dispath]);

    const handleFilterCategory = async (values) => {
        if(values === 'all')
        {
            const fecthFiler = await dispath(getAllProduct());
            setlistProduct(fecthFiler.payload);
        }
        else {
            const fecthFiler = await dispath(getCategoryById(values));
            setlistProduct(fecthFiler.payload);
        }
    }

    return (
        <>
            <Helmet>
                <title>BIBI Korea | Sản Phẩm</title>
            </Helmet>
            <div className="product-store">
                <Container>
                    <div className="pd-store-banner">
                        <div className="image-banner">
                            <img src="https://dotobjyajpegd.cloudfront.net/photo/5c4710494315d00f6028a4e7" alt="NotImage"/>
                        </div>
                        <div className="content-banner">
                            <div className="title">Tại BIBI Store bạn sẽ được :</div>
                            <div className="text">
                                <span>Chia sẽ kiến thức chăm sóc da và quy trình dưỡng da phù hợp .</span>
                                <span>Hỗ trợ tư vấn liên hệ phone: 0934.550.758 .</span>
                                <span>Cam kết hàng chính hãng 100% .</span>
                            </div>
                        </div>
                    </div>
                    <div className="pd-store-content">
                        <SideBarProduct listCategory={listCategory} handleFilterCategory={handleFilterCategory}/>
                        <WrapperProduct listProduct={listProduct} isLoading={isLoading}/>
                    </div>
                </Container>
            </div>
        </>
     
    );
};


ProductStore.propTypes = {

};


export default ProductStore;
