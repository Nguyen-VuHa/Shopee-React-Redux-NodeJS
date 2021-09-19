import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const icons = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-circle",
    error: "fas fa-exclamation-circle"
};

const ToastMessage = (props) => {
    const { title, type, message} = props;
    const icon = icons[type];
    return (
        <div className="toast__mesage">
            <div className="toast__icon">
                <i className={icon}></i>
            </div>
            <div className="toast__body">
                <h3 className="toast__title">{title}</h3>
                <p className="toast__msg">{message}</p>
            </div>
        </div>
    );
};


ToastMessage.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string,
};

ToastMessage.defaultProps = {
    title: '',
    message: '',
    type: '',
}

export default ToastMessage;


