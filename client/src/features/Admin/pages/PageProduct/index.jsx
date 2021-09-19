import adminApi from "api/adminApi";
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

const Product = () => {
    const url = useRouteMatch();
    const [listProduct, setlistProduct] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        const fecthDataProduct = async() => {
            const data = await adminApi.getProduct();
            if(data.length > 0)
                setlistProduct(data.reverse());
            else
                setlistProduct(null);
        }

        fecthDataProduct();

    }, []);

    const handleUpdateProduct = (values, e) => {
        if(e.target.className !== 'fal fa-trash-alt')
        {
            history.push(`${url.path}/update-product/${values}`);
        }
    }
  
   
    return (
        <SimpleBar forceVisible="y" autoHide={false} style={{maxHeight: '100%'}}>
            <div className="ad-products">
                <div className="pd-header">
                    <div className="pd-left">
                        <div>Sản Phẩm</div>
                        <span>{listProduct ? listProduct.length : 0}</span>
                    </div>
                    <div className="pd-right">
                        <Link to={`${url.path}/new-product`} className="btn-add-pd">
                            <i className="fal fa-plus"></i>
                            Thêm sản phẩm
                        </Link>
                    </div>
                </div>
                <div className="pd-content">
                    <ul className="pd-content__list"> 
                        <li className="item-list">
                            <div className="item__filter"></div>
                        </li>
                        <li className="item-list list-header">
                            <div className="item-list__header">
                                <div className="dyamic-width">
                                    <div className="pd-name">Tên sản phẩm</div>
                                </div>
                                <div className="static-width">
                                    <div className="pd-hd pd-sku">Mã Sản Phẩm</div>
                                    <div className="pd-hd pd-price">Giá</div>
                                    <div className="pd-hd pd-inventory">Tồn kho</div>
                                    <div className="pd-hd pd-option"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="pd-content__table">
                        
                        { listProduct ? 
                            listProduct.map((data, index) => {
                                return (
                                    <li className="item-table" key={index} onClick={(e) => handleUpdateProduct(data.idProduct, e)}>
                                        <div className="dyamic-width">
                                            <div className="context-name">
                                                <div className="pd-img">
                                                    <img src={data.imageUrl} alt="NotImage"/>
                                                </div>
                                                <div className="info-product">
                                                    <div className="text-name">
                                                    {data.nameProduct}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="static-width">
                                            <div className="pd-hd context-sku">{data.idProduct}</div>
                                            <div className="pd-hd context-price">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</div>
                                            <div className="pd-hd context-inventory">Có hàng trong kho</div>
                                            <div className="pd-hd context-option">
                                                <i className="fal fa-trash-alt"></i>
                                            </div>
                                        </div>
                                    </li>
                                )
                            
                            })
                            :   
                            <li className="item-table not-product">
                                <h3>Không có sản phẩm nào trong kho</h3>
                            </li>
                        }
                    
                    </ul>
                </div>
            </div>
        </SimpleBar>
    );
};


Product.propTypes = {

};


export default Product;
