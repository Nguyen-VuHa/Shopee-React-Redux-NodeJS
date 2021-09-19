import React from 'react';
import { Link } from 'react-router-dom';
import './banner.scss';


const Banner = () => {
    return (
        <>
            <section className="banner">
                <div className="backgound-banner"></div>
                <div className="content-banner">
                    <div className="text-content">
                        <h1>The Korean Cosmetics Paradise</h1>
                    </div>
                    <Link to="/shop-all">
                        Shop the collection
                    </Link>
                </div>
            </section>
        </>
    );
};


Banner.propTypes = {

};


export default Banner;
