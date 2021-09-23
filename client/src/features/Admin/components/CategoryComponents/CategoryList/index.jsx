import React from 'react';

const CategoryList = (props) => {
    const { data, handleUpdateCategory,  handleRemoveCategory, handleOpenOption } = props; 

    return (
        <div className="card-box">
            <div className="card-bg">
                { data.urlImage ?  <img src={data.urlImage} alt="NotImage"/> : ''}
            </div>
            <div className="card-shadow"></div>
            <div className="card-content">
                <div className="name-collection">
                    {data.nameCategory}
                </div>
                <span className="count-collection">{data.countProduct}</span>
            </div>
            <div className="card-option">
                <div className="btn-circle btn-option" onClick={(e) => handleOpenOption(e)}>
                    <i className="far fa-ellipsis-h"></i>
                    <div className="group-box content-option">
                        <ul className="list-option">
                            <li 
                                className="item-option" 
                                onClick={() => handleUpdateCategory(data.idCategory)}
                            >
                                <i className="fal fa-edit"></i>
                                Chỉnh sửa
                            </li>
                            <li 
                                className="item-option item-remove" 
                                onClick={() => handleRemoveCategory(data.idCategory)}
                            >
                                <i className="fal fa-trash-alt"></i>
                                Xóa
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


CategoryList.propTypes = {

};


export default CategoryList;
