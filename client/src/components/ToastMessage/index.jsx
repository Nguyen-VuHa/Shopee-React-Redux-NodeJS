import { ToastContext } from 'context/toastContext';
import React, { useContext } from 'react';
import {
    FaCheck, 
    FaExclamationCircle, 
    FaExclamationTriangle, 
    FaInfoCircle,
    FaRegWindowClose,
} from 'react-icons/fa';
import './toast_message.scss';

const ToastMessage = (props) => {
    const { autoDeleteInterval } = props;
    const {state, dispatch} = useContext(ToastContext);

    const generateIcon = (type) => {
        switch (type) {
            case 'INFO':
                return <FaInfoCircle />
            case 'WARNING':
                return <FaExclamationTriangle />
            case 'ERROR':
                return <FaExclamationCircle />
            case 'SUCCESS':
                return <FaCheck />
            default:
                return <FaInfoCircle />
        }
    }

    const generateBackgoundColor = (type) => {
        switch (type) {
            case 'INFO':
                return "#36b9cc";
            case 'WARNING':
                return "#f6c23e";
            case 'ERROR':
                return "#e74a3b";
            case 'SUCCESS':
                return "#1cc88a";
            default:
                return <FaInfoCircle />
        }
    }

    return (
        <div className={`notification-container top-right`}>
            {state.map((notification) => {
                if(autoDeleteInterval) {
                    setTimeout(() => {
                        dispatch({
                            type: 'DELETE_NOTIFICATION',
                            payload: notification.id
                        })
                    }, autoDeleteInterval)
                }   
                return (
                    <div key={notification.id}>
                        <div 
                            className={`notification toast-noti ${notification.position}`}
                            style={{backgroundColor: `${generateBackgoundColor(notification.type)}`}}
                        >
                            <FaRegWindowClose 
                                onClick={() => dispatch({type: 'DELETE_NOTIFICATION', payload: notification.id })} 
                                className="close-btn"/>
                            <div className="notification-image">
                                {generateIcon(notification.type)}
                            </div>
                            <div>
                                <p className="notification-tilte">
                                    { notification.title }
                                </p>
                                <p className="notification-message">
                                    { notification.message }
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
       
    );
};


ToastMessage.propTypes = {

};


export default ToastMessage;
