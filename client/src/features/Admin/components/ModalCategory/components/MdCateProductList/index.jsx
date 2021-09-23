import React from 'react';
import { useSelector } from 'react-redux';
import MdCateProductItem from '../MdCateProductItem';

const MdCateProductList = (props) => {
    const { listProduct, handleChooseItem } = props;
    const listChecked = useSelector((state) => state.modalChecked);
    
    return (
        <ul className="product-list">
            { listProduct.length > 0 ? 
                listProduct.map(function(data, index) {
                    return <MdCateProductItem 
                                key={index} data={data} 
                                handleChooseItem={handleChooseItem} 
                                isChecked={listChecked.includes(data.idProduct)}
                            />
                })
            : 
                <li className="product-row-emty ">
                    <h3>Không tìm thấy sản phẩm nào ở đây</h3>
                </li>
            }
        </ul>
    );
};


MdCateProductList.propTypes = {

};


export default MdCateProductList;
