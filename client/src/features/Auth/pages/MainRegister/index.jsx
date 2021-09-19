import { unwrapResult } from '@reduxjs/toolkit';
import ToastMessage from 'components/ToastMessage/toastmessage';
import { getRegister } from 'features/Auth/authSlice';
import RegisterForm from 'features/Auth/components/RegisterForm';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainRegister = () => {
    const dispath = useDispatch();
    const history = useHistory();
    
    const handleOnSubmit = async (values) => {
        try {
            const actionResult = await dispath(getRegister(values));
            const messageResult = unwrapResult(actionResult);
            if(messageResult === 'success')
            {   
                toast.success(<ToastMessage title='Successfully!' message='Đăng ký thành công!' type='success'/>)
                history.push('/auth/login');
            }
            else {
                toast.warn(<ToastMessage title='Warning!' message={messageResult} type='warning'/>);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return (
        <>
            <Helmet>
                <title>BIBI Korea | Đăng Ký Tài Khoản</title>
            </Helmet>
            <RegisterForm id="form-reg" onSubmit={handleOnSubmit}/>
        </>
        
    );
};


MainRegister.propTypes = {

};


export default MainRegister;