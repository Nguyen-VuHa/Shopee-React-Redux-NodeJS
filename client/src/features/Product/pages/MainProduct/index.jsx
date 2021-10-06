import SideBarProduct from 'features/Product/components/SideBarProduct';
import WrapperProduct from 'features/Product/components/WrapperProduct';
import { getCategoryById, getProductView } from 'features/Product/productSlice';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';

const MainProduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        $('.product-store').show('slow');
    }, []);

    const handleFilterCategory = async (values) => {
        if(values === 'all')
        {
            const action = getProductView();
            dispatch(action);
        }
        else {
            const action = getCategoryById(values);
            dispatch(action);
        }
    }

    return (
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
                    <SideBarProduct handleFilterCategory={handleFilterCategory}/>
                    <WrapperProduct />
                </div>
            </Container>
        </div>
    );
};


MainProduct.propTypes = {

};


export default MainProduct;
