import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import './modal-addi.scss';
import PropTypes from 'prop-types';

const ModalAddi = (props) => {
    const { isUpdateModal, handleRemoveItem, handleValuesModal, handleUpdateValues } = props;

    const [values, setValues] = useState({
        title: '',
        desc: '',
    });

    function clearForm() {
        $('.additioalInfo').closest('form').find("input[type=text], textarea").val("");
        $('.titleInfo').removeClass('is-invalid');
        $('.descInfo').removeClass('is-invalid');
        setValues({});
    }

    function cancelPopup() {
        $('.modal-open').addClass('hidden');
        $('.addi-modal').addClass('cancel');
    }
    
    useEffect(() => {
        $('.btn-close-modal').on('click', function(){
            cancelPopup();
            clearForm();
        });

        $('.modal-cancel').on('click', function(){
            cancelPopup();
            clearForm();
        });

        
    }, []);

    const handleSubmit = () => {
        if(!values.title)
        {
            $('.titleInfo').addClass('is-invalid');
        }
        else if(!values.desc)
        {
            $('.descInfo').addClass('is-invalid');
        }
        else {
            if(isUpdateModal) {
                handleUpdateValues({
                    index: isUpdateModal.index,
                    data: values,
                });
            }
            else {
                handleValuesModal(values);
            }
            cancelPopup();
            clearForm();
        }
    }

    useEffect(() => {
        if(isUpdateModal) {
            setValues(isUpdateModal.data);
        }
    }, [isUpdateModal]);

    const handleRemove = (index) => {
        handleRemoveItem(index);
        cancelPopup();
        clearForm();
    }

    const onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setValues({
            ...values,
            [name]: value,
        });

        if(name === 'title' || name === 'desc')
        {
            $('.titleInfo').removeClass('is-invalid');
            $('.descInfo').removeClass('is-invalid');
        }
    }

    return (
        <div className="modal-open hidden">
            <div className="addi-modal-bg">
                <div className="addi-modal cancel">
                    <div className="additioalInfo">
                        <header className="addi-modal-title">
                            <h1>Thêm mục thông tin</h1>
                            <div className="btn-close-modal">
                                <i className="fal fa-times-circle"></i>
                            </div>
                        </header>
                        <section className="addi-modal-content">
                            <FormGroup>
                                <Label>Tiêu đề mục thông tin</Label>
                                <Input autoComplete="off" className="titleInfo" type="text" name="title" value={values.title} onChange={onHandleChange} placeholder="Vd: Thông số kỹ thuật"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Mô Tả</Label>
                                <Input autoComplete="off" className="descInfo" type="textarea" name="desc" style={{height: '100px'}} onChange={onHandleChange} value={values.desc}/>
                            </FormGroup>
                        </section>
                        <div className="addi-modal-footer">
                            <div className="remove-info">
                                {isUpdateModal ?  <div className="modal-remove" onClick={() => handleRemove(isUpdateModal.index)}>Xóa mục thông tin</div> : ''}
                            </div>
                            <div className="group-button">
                                <div className="modal-cancel">Hủy</div>
                                <div className="modal-save" onClick={handleSubmit}>Save As</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};


ModalAddi.propTypes = {
    handleValuesModal: PropTypes.func,
    handleRemoveItem: PropTypes.func,
    handleUpdateValues: PropTypes.func,
    isUpdateModal: PropTypes.number,
};

ModalAddi.defaultProps = {
    handleValuesModal: null,
    handleRemoveItem: null,
    handleUpdateValues: null,
}


export default ModalAddi;
