import React from 'react';


const ChatBoxHeader = ({ setshowMessage }) => {
    const userInfo = JSON.parse(localStorage.getItem('info-user'));

    const handleCloseChatBox = () => {
        setshowMessage(false);
    } 

    return (
        <div className="card-header msg_head">
            <div className="group-info">
                <div className="img_cont-header">
                    <img 
                        src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-de-thuong.jpg" 
                        alt="not user"
                    />
                    <span className="online_icon" />
                </div>
                <div className="user_info">
                    <span>{ userInfo?.fullname }</span>
                </div>
            </div>
            <div className="group-btn">
                <div className="btn-close-box" onClick={() => handleCloseChatBox()}>
                    <i className="fal fa-times"></i>
                </div>
            </div>
        </div>
    );
};


ChatBoxHeader.propTypes = {

};


export default ChatBoxHeader;
