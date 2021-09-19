import Banner from 'features/HomePage/components/Banner';
import React from 'react';
import Sales from 'features/HomePage/components/Sales';
import ProductAds from 'features/HomePage/components/ProductAds';


const MainHomePage = () => {
    return (
        <div>
            <Banner />
            <Sales />
            <ProductAds />
        </div>
    );
};


MainHomePage.propTypes = {

};


export default MainHomePage;
