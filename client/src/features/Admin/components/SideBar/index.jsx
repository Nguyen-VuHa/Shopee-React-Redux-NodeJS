import $ from 'jquery';
import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const SideBar = () => {
    const url = useRouteMatch();
    
    useEffect(() => {
       $('.list-sider__item').on('click', function() {
           $(this).addClass('active').siblings().removeClass('active');
       })
    }, []);
    
    return (
        <div className="ad-sidebar">
            <ul className="list-sider">
                <li className="list-sider__item">
                    <Link to={`${url.path}/product`} style={{width: '100%', height: '100%'}}>Sản phẩm cửa hàng</Link>
                </li>
                <li className="list-sider__item">
                    <Link to={`${url.path}/category`} style={{width: '100%', height: '100%'}}>Bộ sưu tập</Link>
                </li>
            </ul>
        </div>
    );
};


SideBar.propTypes = {

};


export default SideBar;
