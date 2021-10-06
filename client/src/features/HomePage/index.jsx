import React, { useEffect } from 'react';
import './homepage.scss';
import MainHomePage from './pages/Main';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { getSliders } from './homepageSlice';

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        const action = getSliders();
        dispatch(action);
    }, [dispatch]);

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
