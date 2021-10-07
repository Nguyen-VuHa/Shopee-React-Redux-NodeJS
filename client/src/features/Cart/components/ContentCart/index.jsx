import { cartSelectors } from 'features/Cart/cartSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import ItemCart from '../ItemCart';


const ContentCart = () => {
    const stateCarts = useSelector(cartSelectors.selectAll);

    return (
        <div className="content-cart" >
            {
                stateCarts.length > 0 ?
                    stateCarts.map((data) => {
                        return <ItemCart key={data.id} data={data} />
                    })
                :   <span>
                        Giỏ hàng hiện đang trống
                    </span>
            }
        </div>
    );
};


ContentCart.propTypes = {

};


export default ContentCart;
