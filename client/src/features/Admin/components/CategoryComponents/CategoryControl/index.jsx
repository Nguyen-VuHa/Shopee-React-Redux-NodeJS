import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';


const CategoryControl = (props) => {
    const url = useRouteMatch();
    const { countCategory } = props;
    
    return (
        <div className="pd-collection__header">
            <div className="hd-left">
                <div>Bộ Sưu Tập</div>
                <span>{ countCategory }</span>
            </div>
            <div className="hd-right">
                <Link to={`${url.path}/new-category`} className="btn btn-add-collection">
                    <i className="fal fa-plus"></i>
                    Bộ sưu tập mới
                </Link>
            </div>
        </div>
    );
};


CategoryControl.propTypes = {

};


export default CategoryControl;
