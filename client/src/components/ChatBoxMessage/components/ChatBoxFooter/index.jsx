import React from 'react';

const ChatBoxFooter = (props) => {
    const { handleSubmitInput, settextMessage, textMessage, scrollRef, textAreaRef } = props;
    
    const handleOnChange = (e) => {
        settextMessage(e.target.value);
    }

    const handleKeyUp = (e) => {
        textAreaRef.current.style.height = "auto";
        var scHeight = e.target.scrollHeight;
        textAreaRef.current.style.height = `${scHeight}px`;
    }

    const handleFocus = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
            <div className="card-footer">
                <div className="input_msg">
                    <textarea 
                        type="text" placeholder="Type your message..."
                        onKeyUp={(e) => handleKeyUp(e)}
                        onKeyDown={(e) => handleSubmitInput(e)}
                        onFocus={() => handleFocus()}
                        ref={textAreaRef}
                        value={textMessage}
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className="input-group">
                    <div className="input-group-append">
                        <div className="input-option">
                            <i className="fas fa-paperclip" />
                        </div>
                        <div className="input-option">
                            <i className="fal fa-kiss-wink-heart"></i>
                        </div>
                        <div className="input-option">
                            <i className="fal fa-images"></i>
                        </div>
                    </div>
                    <div className="input-group-append">
                        <span className="input-like">
                            <i className="fad fa-heart-circle"></i>
                        </span>
                    </div>
                </div>
            </div>
    );
};


ChatBoxFooter.propTypes = {

};


export default ChatBoxFooter;
