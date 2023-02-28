import React from 'react'
import "../MessagePopUp/messagpopUp.styles.scss";
const MessagePopUp = ({message}) => {
  return (
    <div className="popup-container" id="popup-container">
        <div className="popup-content">
          <i className="fa fa-check-circle success-icon"></i>
          <p className="success-message">{message}</p>
        </div>
    </div>
  )
}

export default MessagePopUp;