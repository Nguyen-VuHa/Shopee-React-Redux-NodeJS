import { ModalProductContext } from 'context/modalProductContext';
import React, { useContext } from 'react';
import './../ModalSlideShow/modal_slide_show.scss';
import './modal_notification.scss';

const ModalNotification = () => {
    const {state, dispatchModal} = useContext(ModalProductContext);

    const handleClick = () => {
        dispatchModal({
            type: 'DELETE_MODAL_CONTEXT',
            payload: {
                status : false,   
                title: '',
                message: '',
            }
        })
    }

    const handleOpenShopee = () => {
        window.open('https://shopee.vn/havu_authentic', '_blank');
    }

    return (
        <div id="my-modal" className={state.status ? 'modal-slide fade show' : 'modal-slide fade'}>
            <div className="modal-dialog-bg">
                <div className="modal-noti-content">
                   <div className="title-noti">
                        <h4>{ state.title }</h4>
                        <span>{ state.message }</span>
                   </div>
                   <div className="btn-group">
                        <div 
                            className="btn-shopee"
                            onClick={() => handleOpenShopee()}
                        >
                            Đi đến Shopee
                        </div>
                        <div className="btn-ok" 
                            onClick={() => handleClick()}
                        >
                            Đã hiểu
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
};


ModalNotification.propTypes = {

};


export default ModalNotification;
