import React from 'react'

const Message = props => {

  const ClickCloseMessage = (e) => {
    e.preventDefault()
    let popupMenu = document.querySelector('.message')
    popupMenu.classList.toggle('message_hidden')
  }

    let className = "";
    if (!props.message.timer1) {
        if (!props.message.timer2) className = " message_hidden"
        className = " message_fading"
    }
  return (
    <div className={"message" + className}>
    <div className='message-ctx'>
      {props.message.text}
      <button className='message-close-btn' onClick={ClickCloseMessage}>close</button>

</div>
    </div>
  );
};


export default Message