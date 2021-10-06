import React from 'react';
import './loadingpage.scss';
import HashLoader from 'react-spinners/HashLoader';

const LoadingPage = () => {
    return (
        <div className="loading">
            <div className="content-loading">
                <HashLoader color="#bc4c2a" loading={true} size={100}/>
                <h4>Loading . . .</h4>
            </div>
        </div>
    );
};


LoadingPage.propTypes = {

};


export default LoadingPage;
