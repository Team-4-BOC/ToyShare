import React from 'react';
import { RiNotification2Line } from 'react-icons/ri';

const NotificationDropdown = ({ showNotifs, setShowNotifs, notifications }) => {
  const style = {
    position: 'flex',
    left: '0',
    top: '30px',
    zIndex: '1'
};
  return (
    <div className="notification-dropdown">
      <div onClick={()=>setShowNotifs(!showNotifs)} className="bell-icon">
        <RiNotification2Line />
      </div>
      {showNotifs ? <div style={style} className="notification-list">
        {notifications.map((notification, index) => (
          <div className="notification" key={index}>
            {notification}
          </div>
        ))}
      </div> : null }
    </div>
  );
};

export default NotificationDropdown;
