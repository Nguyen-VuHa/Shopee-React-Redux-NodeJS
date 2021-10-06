import { unwrapResult } from '@reduxjs/toolkit';
import { ToastContext } from 'context/toastContext';
import { getLogin } from 'features/Auth/authSlice';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import { v4 as uuidv4 } from 'uuid';

const MainLogin = (props) => {
    const disPath = useDispatch();
    const {dispatch} = useContext(ToastContext);
    const handleOnSubmit = async (values) => {
        try {
            const actionResult = await disPath(getLogin(values));
            const messageResult = unwrapResult(actionResult);
            if(messageResult.status === 'success')
            {   
                localStorage.setItem('accessToken', messageResult.accessToken);
                localStorage.setItem('refreshToken', messageResult.refreshToken);
                const objData = {
                    isLogin: true,
                    info: messageResult.infoUser,
                }

                localStorage.setItem('info-user', JSON.stringify(objData));
                
                props.handleCheckLogin(objData);
            }
            else {
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: {
                        id: uuidv4(),
                        type: "WARNING",
                        title: "Warning!",
                        message: 'Password hoặc Email bị sai!',
                        position: "top-right",
                    }
                })
                const objData = {
                    isLogin: false,
                    fullname: null,
                }
                props.handleCheckLogin(objData);
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
                <title>BIBI Korea | Đăng nhập</title>
            </Helmet>
            <LoginForm onSubmit={handleOnSubmit}/>
        </>
       
    );
};


MainLogin.propTypes = {
    handleCheckLogin: PropTypes.func,
};

MainLogin.defaultProps = {
    handleCheckLogin: null,
}


export default MainLogin;
