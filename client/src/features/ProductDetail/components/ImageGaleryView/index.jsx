import React, { useEffect, useRef, useState } from 'react';
import ImageGalery from '../ImageGalery';

const ImageGaleryView = (props) => {
    const { dataImage } = props;
    const itemRef = useRef(null);
    const [imageLightBox, setimageLightBox] = useState(dataImage[dataImage.length - 1].imageUrl);

    const handleMouseMove = (imageUrl) => {
        setimageLightBox(imageUrl);
    }

    return (
        <div className="group-gallery">
            <div className="col-12 mb-1">
                <ImageGalery src={imageLightBox}/>
            </div>
            <div className="grid-column-image mt-3">
                {dataImage.length > 0 ? 
                    dataImage.slice(0).reverse().map((item) => {
                        return  <div 
                                    key={item.id} 
                                    className={item.imageUrl === imageLightBox ? 'image-item active' : 'image-item'}
                                    onMouseEnter={() => handleMouseMove(item.imageUrl)}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt="Gallery image 1"
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
