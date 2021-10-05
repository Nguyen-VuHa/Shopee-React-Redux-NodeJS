import { setTotalPrice } from 'features/Cart/totalPriceSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemCart from '../ItemCart';


const ContentCart = () => {
    const stateCart = useSelector((state) => state.carts);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!stateCart.loading) {
            const action = setTotalPrice(stateCart?.listCart);
            dispatch(action);
        }
    }, [dispatch, stateCart?.listCart]);

    return (
        <div className="content-cart" >
            { stateCart?.listCart.length > 0 ? 
                    stateCart?.listCart.length > 0 ?
                        stateCart?.listCart.map(function(data) {
                        return <ItemCart key={data.id} data={data} />
                            }) : '' 
            :
            <span>
                Giỏ hàng hiện đang trống
            </span>
            }
        </div>
    );
};


ContentCart.propTypes = {

};


export default ContentCart;
