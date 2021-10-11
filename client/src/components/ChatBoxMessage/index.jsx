import 'moment/locale/vi';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './chat_box_message.scss';
import ChatBoxContent from './components/ChatBoxContent';
import ChatBoxFooter from './components/ChatBoxFooter';
import ChatBoxHeader from './components/ChatBoxHeader';
import userApi from 'api/userApi';
import { useSelector } from 'react-redux';

const ChatBoxMessage = ({ idAdmin, showMessage, setshowMessage }) => {
    const [textMessage, settextMessage] = useState('');
    const [message, setMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('info-user'));
    const accessToken = localStorage.getItem('accessToken');
    // const socketRef = useRef(io('ws://localhost:8900'));
    const socketRef = useRef(io('http://bibi-cosmetic-store.herokuapp.com/'));
    const scrollRef = useRef(null);
    const textAreaRef = useRef(null);
    const stateLogin = useSelector((state) => state.isLogin);

    useEffect(() => {
        if(stateLogin.isLogin) {
            socketRef.current = io('http://bibi-cosmetic-store.herokuapp.com/');
            // socketRef.current = io('ws://localhost:8900');
            socketRef.current.on('getMessage', data => {
                var keyEncode = process.env.REACT_ENCODE_VALUE_MESSAGE || '9430516975';
                var messageReponse = data.text.replace(keyEncode, '');
                var decodeMessage = Buffer.from(messageReponse, 'base64').toString('utf8');
                setArrivalMessage({
                    messageType: "TEXT",
                    messageText: decodeMessage,
                    createdAt: Date.now(),
                    sender_id: data.senderId,
                })
            });
        }
    }, []);

    useEffect(() => {
        const fectchMessage = async () => {
            return await userApi.getMessage(userInfo.id, idAdmin, accessToken);
        }
        
        if(showMessage)
        {
            fectchMessage().then(value => {
                setMessage(value.data);
                scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [showMessage]);

    useEffect(() => {
        arrivalMessage && setMessage([...message, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        if(stateLogin.isLogin) {
            socketRef.current.emit('addUser', userInfo.id);
            socketRef.current.on('getUsers', users => {
                // console.log(users);
            });
        }
    }, []);

    const handleSubmitInput = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            if(textMessage.trim() && idAdmin && userInfo.id !== idAdmin) {
                var endCodeMessage = Buffer.from(textMessage).toString('base64');
                var rdIndex = Math.floor(Math.random() * endCodeMessage.length);
                var keyEncode = process.env.REACT_ENCODE_VALUE_MESSAGE || '9430516975';
                var messageSend = endCodeMessage.substr(0, rdIndex) + keyEncode + endCodeMessage.substr(rdIndex);
                socketRef.current.emit('sendMessage', {
                    senderId: userInfo.id,
                    receiverId: idAdmin,
                    text: messageSend,
                });
                userApi.postMessage({
                    sender_id: userInfo.id,
                    conversation_id: idAdmin,
                    messageType: 'TEXT',
                    messageText: textMessage,
                }, accessToken);
                setMessage([...message, {
                    messageType: "TEXT",
                    messageText: textMessage,
                    createdAt: Date.now(),
                    sender_id: userInfo.id,
                }]);
                textAreaRef.current.style.height = "40px";
                settextMessage('');
                setTimeout(() => {
                    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            else {
                console.log('không thể nhắn tin!')
            }
        }
    }

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [message]);

    return (
        <div className={showMessage ? "chat-box-message show" : "chat-box-message hide"}>
            <div className="card-box">
                <ChatBoxHeader socketRef={socketRef} setshowMessage={setshowMessage}/>
                <div 
                    id="card-message"
                    className="card-message" 
                    data-simplebar style={{width: '100%', maxHeight: '300px'}} 
                >
                        <div id="scrollMessage">
                            <div className="message-firts mb-4">
                                <span>Bây giờ bạn có thể liên hệ với người bán.</span>
                            </div>
                        <ChatBoxContent scrollRef={scrollRef} message={message}/>
                    </div>
                </div>
                <ChatBoxFooter 
                    handleSubmitInput={handleSubmitInput} 
                    settextMessage={settextMessage} 
                    textMessage={textMessage}
                    scrollRef={scrollRef}
                    textAreaRef={textAreaRef}
                />
            </div>
        </div>
    );
}

ChatBoxMessage.propTypes = {

};

export default ChatBoxMessage;
