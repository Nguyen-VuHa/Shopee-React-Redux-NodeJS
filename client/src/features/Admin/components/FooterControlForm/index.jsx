import React from 'react';
import { useHistory } from 'react-router';


const FooterControlForm = (props) => {
    const { handleOnSave } = props;
    const history = useHistory();
    
    const handleCancelForm = () => {
        history.goBack();
    }


    return (
        <div className="productUD__footer">
            <div className="group-btn">
                <div type="button" className="btn btn-cancel-pd" onClick={handleCancelForm}>
                    Hủy
                </div>
                <div 
                    type="button" 
                    className="btn btn-save-pd" 
                    onClick={handleOnSave}
                >
                    Lưu Lại
                </div>
            </div>
        </div>
    );
};


export default FooterControlForm;
