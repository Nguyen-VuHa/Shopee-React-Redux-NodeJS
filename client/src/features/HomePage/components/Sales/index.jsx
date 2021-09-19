import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './sales.scss';

SwiperCore.use([Navigation]);

const SalesHomePage = () => {
    const [windowSize, setwindowSize] = useState(window.innerWidth);

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
                        <SwiperSlide>
                            <div className="card-sales card-active">
                                    <div className="card-out-side">
                                        <div className="card-img">
                                            <img src="https://bibi-cosmetic-store.herokuapp.com/api/product/image/939c1194-3a2c-40ef-b05f-17be3548672b" alt="NotImage"/>
                                        </div>
                                        <div className="card-armorial">
                                            Best Seller
                                        </div>
                                        <div className="card-info">
                                            <div className="c__name-product">Serum Lumos Acne</div>
                                            <span>300.000 đ</span>
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
                        <SwiperSlide>
                                <div className="card-sales card-active">
                                    <div className="card-out-side">
                                        <div className="card-img">
                                            <img src="https://bibi-cosmetic-store.herokuapp.com/api/product/image/cf098ad9-a794-4667-a3da-1829c25d04fa" alt="NotImage" />
                                        </div>
                                        <div className="card-armorial">
                                            Best Seller
                                        </div>
                                        <div className="card-info">
                                            <div className="c__name-product">Mặt nạ cấp ẩm Lanci Vitamin Total Mask Pack Hàn Quốc</div>
                                            <span>400.000 đ</span>
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
                        <SwiperSlide>
                                <div className="card-sales card-active">
                                    <div className="card-out-side">
                                        <div className="card-img">
                                            <img src="https://bibi-cosmetic-store.herokuapp.com/api/product/image/097bac50-0f5f-4011-b4d3-ddd322bab570" alt="NotImage"/>
                                        </div>
                                        <div className="card-armorial">
                                            Best Seller
                                        </div>
                                        <div className="card-info">
                                            <div className="c__name-product">Combo Gội Xả Gừng Trắng Weilaiya</div>
                                            <span>685.000 đ</span>
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
                        <SwiperSlide>
                                <div className="card-sales card-active">
                                    <div className="card-out-side">
                                        <div className="card-img">
                                            <img src="https://bibi-cosmetic-store.herokuapp.com/api/product/image/091fe792-7d96-483b-99cb-fa18303f0de3" alt="NotImage"/>
                                        </div>
                                        <div className="card-armorial">
                                            Best Seller
                                        </div>
                                        <div className="card-info">
                                            <div className="c__name-product">Kem Lanci</div>
                                            <span>900.000 đ</span>
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
                        <SwiperSlide>
                                <div className="card-sales card-active">
                                    <div className="card-out-side">
                                        <div className="card-img">
                                            <img src="https://bibi-cosmetic-store.herokuapp.com/api/product/image/30e532d9-236f-4e69-b6b7-c0b649afde4c" alt="NotImage"/>
                                        </div>
                                        <div className="card-armorial">
                                            Best Seller
                                        </div>
                                        <div className="card-info">
                                            <div className="c__name-product">Kem Dưỡng Ẩm Da Mặt Ronas Stem Cell Hydro Cream 100ml</div>
                                            <span>490.000 đ</span>
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
