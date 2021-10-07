import { unwrapResult } from '@reduxjs/toolkit';
import { ToastContext } from 'context/toastContext';
import { getLogin } from 'features/Auth/authSlice';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';
import { setIsLogin } from 'constants/isLoginSlice';

const MainLogin = () => {
    const disPatch = useDispatch();
    const {dispatch} = useContext(ToastContext);
    const history = useHistory();
    
    const handleOnSubmit = async (values) => {
        try {
            const actionResult = await disPatch(getLogin(values));
            const messageResult = unwrapResult(actionResult);

            if(messageResult.status === 'success')
            {   
                const { accessToken, refreshToken, infoUser } = messageResult
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('info-user', JSON.stringify(infoUser));
                disPatch(setIsLogin());
                history.replace('/');
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
};



export default MainLogin;
