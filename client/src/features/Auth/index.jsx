import PageNotFound from 'components/PageNotFound';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import './auth.scss';
import MainLogin from './pages/MainLogin';
import MainRegister from './pages/MainRegister';

const Auth = () => {
    const match = useRouteMatch();
    const isLogin = useSelector((state) => state.isLogin);

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
                        { isLogin ? <Redirect to='/' /> : <MainLogin/>}
                    </Route>
                    <Route path={`${match.url}/sign-up`}>
                        { isLogin? <Redirect to='/' /> : <MainRegister /> }
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </div>
    );
};


Auth.propTypes = {
};

export default Auth;
