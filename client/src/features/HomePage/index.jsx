import React, { useEffect } from 'react';
import './homepage.scss';
import MainHomePage from './pages/Main';
import { Helmet } from 'react-helmet';

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    

    return (
        <>
            <Helmet>
                <title>BIBI Korea | Trang Chủ</title>
            </Helmet>
            <div className="homepage">
                <MainHomePage />
            </div>
        </>
    );
};


HomePage.propTypes = {

};


export default HomePage;
