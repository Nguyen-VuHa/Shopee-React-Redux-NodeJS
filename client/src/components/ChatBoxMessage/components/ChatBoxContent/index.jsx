import moment from 'moment';
import React from 'react';

const ChatBoxContent = (props) => {
    const { scrollRef, message } = props;
    const userInfo = JSON.parse(localStorage.getItem('info-user'));

    return (
        <>
            {   message.map((item, index) => {  
                    moment.locale('vi');
                    const momentTime =  moment(item.createdAt).fromNow();
                    return  <div ref={scrollRef} key={index}>
                                <div 
                                    className={item.sender_id === userInfo?.id ? 'boy-content_send mb-2' : 'boy-content mb-2'}
                                >
                                        { item.sender_id === userInfo?.id ? <div className='group-content_send'>
                                                                            <span>{item.messageText}</span>
                                                                            <div className='img_cont_msg'>
                                                                                <img 
                                                                                    src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-de-thuong.jpg"
                                                                                    alt="not user"
                                                                                />
                                                                            </div>
                                                                        </div> 
                                    :   <div className='group-content'>
                                            <div className='img_cont'>
                                                <img 
                                                    src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-de-thuong.jpg"
                                                    alt="not user"
                                                />
                                            </div>
                                            <span>{item.messageText}</span>
                                        </div>}
                                    
                                    <span 
                                        className={item.sender_id === userInfo?.id ? 'msg_time_send' : 'msg_time'}
                                        >{ momentTime.toString() }</span>
                                </div>
                            </div>
                    })
                }
        </>
    );
};


ChatBoxContent.propTypes = {

};


export default ChatBoxContent;
