import React from 'react'

const Message = props => {
    let className = "";
    if (!props.message.timer1) {
        if (!props.message.timer2) className = " message_hidden"
        className = " message_fading"
    }
  return (
    <div className={"message" + className}>
      {props.message.text}
    </div>
  );
};


export default Message