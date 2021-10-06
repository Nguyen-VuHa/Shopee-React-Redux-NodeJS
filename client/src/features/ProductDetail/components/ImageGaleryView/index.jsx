import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageGalery from '../ImageGalery';
import { setIndexImage, setOpenModal } from '../ModalSlideShow/modalShowSlice';

const ImageGaleryView = (props) => {
    const { dataImage } = props;
    const dispatch = useDispatch();
    const [imageLightBox, setimageLightBox] = useState(dataImage[dataImage.length - 1].imageUrl);
    const [idImage, setidImage] = useState(dataImage[dataImage.length - 1].id);

    const handleMouseMove = (imageUrl , id) => {
        setimageLightBox(imageUrl);
        setidImage(id);
    }

    const handleClickSlideShow = (id) => {
        dispatch(setIndexImage(dataImage.slice(0).reverse().findIndex(item => item.id === id)))
        dispatch(setOpenModal());
    }

    return (
        <div className="group-gallery">
            <div className="col-12 mb-1">
                <ImageGalery src={imageLightBox} idImage={idImage} dataImage={dataImage}/>
            </div>
            <div className="grid-column-image mt-3">
                {dataImage.length > 0 ? 
                    dataImage.slice(0).reverse().map((item) => {
                        return  <div 
                                    key={item.id} 
                                    className={item.imageUrl === imageLightBox ? 'image-item active' : 'image-item'}
                                    onMouseEnter={() => handleMouseMove(item.imageUrl, item.id)}
                                    onClick={() => handleClickSlideShow(item.id)}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt="NOT VALUE"
                                        className="item active w-100"
                                    />
                                </div>
                    })
                    : ''
                }
            </div>
        </div>
    );
};


ImageGaleryView.propTypes = {

};


export default ImageGaleryView;
