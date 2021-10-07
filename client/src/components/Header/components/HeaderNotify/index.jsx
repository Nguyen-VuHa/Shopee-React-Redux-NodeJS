import { getCount, getNotify, postUpdate } from 'components/Header/headerSlice';
import Images from 'constants/images';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Notify = (props) => {
    const [count, setCount] = useState(0);
    const [isAccessToken, setIsAccessToken] = useState(false);
    const dispath = useDispatch();

    const handleOnClick = async (e) => {
        const accessToken = localStorage.getItem('accessToken');
        const ousideClick = e.target.closest('.content-noti');
        if(ousideClick)
            return;
        else {
            $('.content-noti').toggleClass('active');
            if($('.content-noti').hasClass('active'))
            {
                if(accessToken) {
                    const resultGet = await dispath(getNotify(accessToken));
                    await dispath(postUpdate(accessToken));
                    props.handleNotifyClick(resultGet);
                    setCount(0);
                }
            }
        }
    }

    useEffect(() => {
        // const fecthToken = async () => {
        //     await fecthRefreshToken();
        //     setIsAccessToken(true)
        // }
        // fecthToken();
    }, []);
    

    useEffect(() => {
        const handleDispathGetCount = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if(isAccessToken)
            {
                try {
                    const result =  await dispath(getCount(accessToken));
                    if(!result.payload) 
                    {
                        setIsAccessToken(false)
                        console.log('failed to dispath');
                    } else {
                        setCount(result.payload.count);
                    }
                }
                catch(err) {
                    console.log(err);
                }
            }
        }

        handleDispathGetCount();
    }, [isAccessToken, dispath]);

    return (
        <div className="user-notification">
            <div className="user-noti">
                <div className="notification">
                    <i className="fad fa-bell" onClick={(e) => handleOnClick(e)}></i>
                        {count > 0 ? <span>{count >= 10 ? '+9' : count}</span> : ''}
                    <div>Thông báo</div>
                </div>
            </div>
            <div className="content-noti">
                <div className="header-content">
                    <h3>Thông báo</h3>
                </div> 
                <div className="line"></div>
                <div data-simplebar style={{width: '100%', maxHeight: '600px'}}>
                    <ul className="body-content" id="body-content">
                        { props.listNotify ? props.listNotify.map(function(data, index) {
                            moment.locale('vi');
                            const momentTime =  moment(data.time).fromNow();
                            return <li className="content-item" key={index}>
                                        <div className="item__img">
                                            <img src={ props.listNotify.img ? props.listNotify.img : Images.BG_USER} alt="NotImage"/>
                                        </div>
                                        <div className="item__text-content">
                                            <div className="text-title" dangerouslySetInnerHTML={{__html: data.massage}}></div>
                                            <div className="text-time">{ momentTime }</div>
                                        </div>
                                    </li>
                        }) : <li>is Loading ...</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};


Notify.propTypes = {
    handleNotifyClick: PropTypes.func,
    listNotify: PropTypes.array.isRequired,
};

Notify.defaultProps = {
    handleNotifyClick: null,
}


export default Notify;
