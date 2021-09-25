import { setTotalPrice } from 'features/Cart/totalPriceSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemCart from '../ItemCart';


const ContentCart = (props) => {
    const { handleClickImage, isShowModal } = props;
    const stateCart = useSelector((state) => state.carts);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isShowModal) {
            const action = setTotalPrice(stateCart?.listCart);
            dispatch(action);
        }
    }, [dispatch, isShowModal]);

    return (
        <div className="content-cart" >
            { stateCart?.listCart.length > 0 ? 
                    stateCart?.listCart.length > 0 ?
                        stateCart?.listCart.map(function(data, index) {
                        return <ItemCart key={data.id} data={data} handleClickImage={handleClickImage} />
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
