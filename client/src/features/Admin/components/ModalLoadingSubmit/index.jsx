import React from 'react';
import PropTypes from 'prop-types';
import './submitload.scss';
import PuffLoader from 'react-spinners/PuffLoader';

const LoadingSubmit = () => {
    return (
        <div className="ld-modal">
            <div className="ld-modal__bg"></div>
            <div className="ld-content">
                <PuffLoader color="#bc4c2a"/>
                <div className="ld-modal__text">Hệ thống đang xử lý. . .</div>
            </div>
        </div>
    );
};


LoadingSubmit.propTypes = {

};


export default LoadingSubmit;
