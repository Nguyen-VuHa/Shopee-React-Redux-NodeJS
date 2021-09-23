import React from 'react';

const EditCateControl = (props) => {
    const { stateListChecked, handleOpenModal } = props;

    return (
        <div className="content-header">
            <div className="title-hd">
                <div className="title">Sản phẩm trong bộ sưu tập</div>
                <span>{stateListChecked.length}</span>
            </div>
            {stateListChecked.length > 0  ?  <div className="btn btn-hd-add" onClick={handleOpenModal}>
                                            <i className="fal fa-plus"></i>
                                            Thêm sản phẩm
                                        </div>
            : ''}
            
        </div>
    );
};


EditCateControl.propTypes = {

};


export default EditCateControl;
