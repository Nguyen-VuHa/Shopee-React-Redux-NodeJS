import { slidersSelectors } from 'features/HomePage/homepageSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './sales.scss';

SwiperCore.use([Navigation]);

const SalesHomePage = () => {
    const [windowSize, setwindowSize] = useState(window.innerWidth);
    const stateSlide = useSelector(slidersSelectors.selectAll);

    useEffect(() => {
        window.addEventListener('resize', reportWindowSize);

        function reportWindowSize() {
            setwindowSize(window.innerWidth);
        }
    }, []);

    return (
        <section className="hp-sales">
            <div  className="hp-sales__title">
                <h3>BEST SELLERS</h3>
            </div>
            <div className="line"></div>
            <div className="slider-sales">
                <Container>
                    <Swiper
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}
                        spaceBetween={windowSize >= '1024' ? 20 : windowSize >= '768' && windowSize < '1024' ? 100 : 10}
                        slidesPerView={windowSize >= '1024' ? 5 :  windowSize >= '768' && windowSize < '1024' ? 2 : 1}
                        navigation
                        pagination={{ clickable: true }}
                        onSlideChange={() => console.log('slide change')}
                        >
                        { stateSlide.length > 0 ? 
                            stateSlide.map((data) => {
                                return <SwiperSlide key={data.idProduct}>
                                        <div className="card-sales card-active">
                                                <div className="card-out-side">
                                                    <div className="card-img">
                                                        <img src={data.imageUrl} alt="NotImage"/>
                                                    </div>
                                                    <div className="card-armorial">
                                                        Best Seller
                                                    </div>
                                                    <div className="card-info">
                                                        <div className="c__name-product">{data.nameProduct}</div>
                                                        <span>{data.price.toLocaleString()} đ</span>
                                                    </div>
                                                </div>
                                                <div className="card-in-side">
                                                    <div className="in-side__content">
                                                        <div className="card-effect">
                                                            <div className="content-info">
                                                                <div className="info-left">
                                                                    <div className="count__sales-product">
                                                                        Đã bán
                                                                        <span className="count">(0)</span>
                                                                    </div>
                                                                    <div className="evaluate__sales-product">
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star"></i>
                                                                        <i className="fas fa-star-half-alt"></i>
                                                                        <i className="fal fa-star"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="info-right">
                                                                    <div className="btn-icon">
                                                                        <i className="fal fa-heart"></i>
                                                                    </div>
                                                                </div>
                                                            
                                                            </div>
                                                            <div className="card-btn">
                                                                <div className="btn btn-info">Xem chi tiết</div>
                                                                <div className="btn btn-add-cart">
                                                                    <i className="fal fa-cart-plus"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                    </SwiperSlide>
                            })
                        : ''}
                    </Swiper>

                    <div className="container-footer">
                        <Link to="/shop-all" className="btn-shop-all" style={{textDecoration: 'none'}}>Shop All Bags</Link>
                    </div>
                   
                </Container>
            </div>
        </section>
    );
};


SalesHomePage.propTypes = {

};


export default SalesHomePage;
