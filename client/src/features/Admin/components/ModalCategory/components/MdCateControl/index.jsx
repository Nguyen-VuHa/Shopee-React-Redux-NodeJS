import React from 'react';


const MdCateControl = (props) => {
    const { handleSubmitModal, handleCloseModal } = props;

    return (
        <div className="group-button">
            <div className="modal-cancel" onClick={() => handleCloseModal()}>Hủy</div>
            <div className="modal-save" onClick={() => handleSubmitModal()}>Thêm</div>
        </div>
    );
};


MdCateControl.propTypes = {

};


export default MdCateControl;
