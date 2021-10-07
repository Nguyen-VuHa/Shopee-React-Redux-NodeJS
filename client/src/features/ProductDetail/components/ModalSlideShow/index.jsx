import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCloseModal } from './modalShowSlice';
import './modal_slide_show.scss';

const ModalSlideShow = () => {
    const modalSlide = useSelector((state) => state.modalSlide);
    const [windowSize, setwindowSize] = useState(window.innerWidth);
    const [indexImage, setindexImage] = useState(0);
    const [idActive, setidActive] = useState('');
    const [slideWidth, setslideWidth] = useState(0);
    const slideContainerRef = useRef(null);
    const dispatch = useDispatch();

    

    useEffect(() => {
        window.addEventListener('resize', reportWindowSize);

        function reportWindowSize() {
            setwindowSize(window.innerWidth);
        }

        const slideImage = document.querySelectorAll(".slide-image");

        if(slideImage.length > 0) {
            var slideWidth = slideImage[0].clientWidth; 
            
            setslideWidth(slideWidth);
            setindexImage(modalSlide.indexImage);
            setidActive(modalSlide.imageSlice[modalSlide.indexImage].id);
            slideImage.forEach((img, index) => {
                img.style.left = index * 100 + "%";
            });

            slideContainerRef.current.style.transform = `translateX(-${slideWidth * modalSlide.indexImage}px)`;
        }
    }, [modalSlide, windowSize]);

    const handleClickNext = () => {
        if(indexImage >= modalSlide.imageSlice.length - 1)
        {
            setindexImage(0);
            setidActive(modalSlide.imageSlice[0].id);
            slideContainerRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
            return;
        }
        setindexImage(indexImage + 1);
        setidActive(modalSlide.imageSlice[indexImage + 1].id)
        slideContainerRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
    }

    const handleClickPrev = () => {
        if(indexImage <= 0)
        {
            setindexImage(modalSlide.imageSlice.length - 1);
            setidActive(modalSlide.imageSlice[modalSlide.imageSlice.length - 1].id);
            slideContainerRef.current.style.transform = `translateX(-${slideWidth * (modalSlide.imageSlice.length - 1)}px)`;
            return;
        }
        setindexImage(indexImage - 1);
        setidActive(modalSlide.imageSlice[indexImage - 1].id);
        slideContainerRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage - 1)}px)`;
    }

    const handleClickActiveItem = (id) => {
        var index = modalSlide.imageSlice.findIndex(item => item.id === id);
        setindexImage(index);
        setidActive(modalSlide.imageSlice[index].id);
        slideContainerRef.current.style.transform = `translateX(-${slideWidth * (index)}px)`;
    }

    return (
        <div id="my-modal" className={modalSlide.isShow ? "modal-slide fade show" : "modal-slide fade" }>
            <div className="modal-dialog-bg">
                <div className="modal-content">
                    <div 
                        className="close-modal-btn"
                        onClick={() => dispatch(setCloseModal())}
                    >
                        <i className="fal fa-times"></i>
                    </div>
                    <div className="wrapper">
                        <div
                            className="prev-btn"
                            onClick={() => handleClickPrev()}
                        >
                            <i className="far fa-chevron-left"></i>
                        </div>
                        <div className="slides-container" ref={slideContainerRef}>
                            {modalSlide.imageSlice.length > 0 ? 
                                modalSlide.imageSlice.map((item) => {
                                    return <div className="slide-image" key={item.id} >   
                                            <img src={item.imageUrl} alt="NOT VALUE" />
                                        </div>
                                })
                            : ''} 
                        </div>
                        <div className="next-btn"
                            onClick={() => handleClickNext()}
                        >
                            <i className="far fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="wrapper-item">
                        { modalSlide.imageSlice.length > 0 ? 
                            modalSlide.imageSlice.map((item) => {
                                return <div 
                                        className={item.id === idActive ? 'item active' : 'item'} 
                                        key={item.id}
                                        onClick={() => handleClickActiveItem(item.id)}
                                    >
                                            <img
                                                src={item.imageUrl}
                                                alt="NOT VALUE"
                                                className="w-100"
                                            />
                                        </div>
                            })
                            : ''}
                    </div>
                </div>
                
            </div>
        </div>
    );
};


ModalSlideShow.propTypes = {

};


export default ModalSlideShow;
