import React from 'react';
import { VscBell, VscBellDot } from "react-icons/vsc";

const NotificationDropdown = ({ newNotifs, setNewNotifs, showNotifs, setShowNotifs, unread, notifications }) => {
  const style = {
    position: 'flex',
    left: '0',
    top: '30px',
    zIndex: '1'
};
  return (
    <div className="notification-dropdown">
        {newNotifs ?
        <div onClick={()=>{ setNewNotifs(false); setShowNotifs(!showNotifs); }} className="bell-icon">
          <VscBellDot />
        </div> :
        <div onClick={()=>setShowNotifs(!showNotifs)} className="bell-icon">
          <VscBell />
        </div>}
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
