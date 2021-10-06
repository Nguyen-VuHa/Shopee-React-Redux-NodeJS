import { unwrapResult } from '@reduxjs/toolkit';
import ToastMessage from 'components/ToastMessage';
import { ToastContext } from 'context/toastContext';
import { getRegister } from 'features/Auth/authSlice';
import RegisterForm from 'features/Auth/components/RegisterForm';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const MainRegister = () => {
    const {dispatch} = useContext(ToastContext);
    const disPath = useDispatch();
    const history = useHistory();
    
    const handleOnSubmit = async (values) => {
        try {
            const actionResult = await disPath(getRegister(values));
            const messageResult = unwrapResult(actionResult);
            if(messageResult === 'success')
            {   
                toast.success(<ToastMessage title='Successfully!' message='Đăng ký thành công!' type='success'/>)
                history.push('/auth/login');
            }
            else {
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: uuidv4(),
                        type: "WARNING",
                        title: "Warning!",
                        message: messageResult,
                        position: "top-right",
                    }
                })
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