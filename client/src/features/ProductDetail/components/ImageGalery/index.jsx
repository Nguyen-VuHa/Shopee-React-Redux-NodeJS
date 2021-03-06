import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIndexImage, setOpenModal } from '../ModalSlideShow/modalShowSlice';


const ImageGalery = ({ src, idImage, dataImage }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        var lightbox_area = document.getElementById('lightbox_area');
        var galery_image = document.getElementById('galery_image');
        var clientX, clientY, mWidth, mHeight;

        lightbox_area.addEventListener('mousemove', function(event) {
            clientX = event.clientX - lightbox_area.offsetLeft;
            clientY = event.clientY - lightbox_area.offsetTop;

            mWidth = lightbox_area.offsetWidth;
            mHeight = lightbox_area.offsetHeight;
            
            clientX = clientX / mWidth * 100;
            clientY = clientY / mHeight * 100;
            
            galery_image.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`;
        })

        lightbox_area.addEventListener('mouseleave', function() {
            galery_image.style.transform = 'translate(-50%, -50%) scale(1)';
        })
    }, []);

    const handleClickLightBox = () => {
        dispatch(setIndexImage(dataImage.slice(0).reverse().findIndex(item => item.id === idImage)))
        dispatch(setOpenModal());
    }

    return (
        <div 
            id="lightbox_area" className="lightbox"
            onClick={() => handleClickLightBox()}
        >
            <img
                src={src}
                alt="NOT VALUE"
                className="galery_image w-100"
                id="galery_image"
            />
        </div>
    );
};


ImageGalery.propTypes = {

};


export default ImageGalery;
