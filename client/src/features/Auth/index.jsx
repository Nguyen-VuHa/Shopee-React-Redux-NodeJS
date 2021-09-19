import React, { useState } from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import './auth.scss';
import MainLogin from './pages/MainLogin';
import MainRegister from './pages/MainRegister';
import PropTypes from 'prop-types';
import PageNotFound from 'components/PageNotFound';

const Auth = (props) => {
    const match = useRouteMatch();
    const [isLogin, setisLogin] = useState(false);

    const handleCheckLogin = (values) => {
        props.handleisLogin(values);
        setisLogin(values.isLogin);
    }

    return (
        <div className="all-auth">
            <div className="auth">
                <Link className="auth-close" to="/">
                    <i className="fal fa-times"></i>
                </Link>
                <Switch>
                    { isLogin ? <Redirect to='/' /> 
                    : <Redirect exact from={match.url} to={`${match.url}/login`} />
                    }

                    <Route path={`${match.url}/login`} >
                        { props.isLogin ? <Redirect to='/' /> : <MainLogin handleCheckLogin={handleCheckLogin}/>}
                    </Route>
                    <Route path={`${match.url}/sign-up`}>
                        { props.isLogin ? <Redirect to='/' /> : <MainRegister /> }
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </div>
    );
};


Auth.propTypes = {
    isLogin: PropTypes.bool,
    handleisLogin: PropTypes.func,
};

Auth.defaultProps = {
    handleisLogin: null,
}

export default Auth;
