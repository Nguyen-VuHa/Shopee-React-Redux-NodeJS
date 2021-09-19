import Header from 'features/Admin/components/HeaderAd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SideBar from './components/SideBar';
import CustomCategory from './pages/AddUpdateCategory';
import CustomProduct from './pages/AddUpdateProducts';
import Category from './pages/Category';
import Product from './pages/PageProduct';
import './admin.scss';

const Admin = () => {
    const match = useRouteMatch();

    return (
        <div className="admin-manager">
            <Helmet>
                <title>Trang Quản Trị Viên</title>
            </Helmet>
            <Header />
            <div className="ad-main">
                <Switch>
                    <Route exact path={`${match.url}/product`}>
                        <Product />
                    </Route>
                    <Route path={`${match.url}/product/new-product`}>
                        <CustomProduct />
                    </Route>

                    <Route path={`${match.url}/product/update-product/:idProduct`}>
                        <CustomProduct />
                    </Route>

                    <Route exact path={`${match.url}/category`}>
                        <Category />
                    </Route>
                    <Route path={`${match.url}/category/new-category`}>
                        <CustomCategory />
                    </Route>
                    <Route path={`${match.url}/category/update-category/:idCategory`}>
                        <CustomCategory />
                    </Route>
                </Switch>
            </div>
            <SideBar />
        </div>
    );
};


Admin.propTypes = {

};


export default Admin;
