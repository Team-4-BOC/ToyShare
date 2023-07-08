import React, { useState, useEffect } from 'react';
import { VscBell, VscBellDot } from "react-icons/vsc";
import axios from 'axios';

const NotificationDropdown = ({ notifications, setNotifications }) => {
  const style = {
    position: 'flex',
    left: '0',
    top: '30px',
    zIndex: '1'
  };

  const [newNotifs, setNewNotifs] = useState();
  const [showNotifs, setShowNotifs] = useState(false);

  const checkNewNotifs = () => {
    if (notifications) {
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].read === false) {
          setNewNotifs(true);
        };
      };
    }
  };

  const setNotifsRead = () => {
    axios.put('/notifications', { user_id: 45 })
    .then(() => {
      setNotifsRead();
    })
  };

  const handleClickNotifs = () => {
    setShowNotifs(!showNotifs);
    if (newNotifs === true) {
      setNewNotifs(false);
      setNotifsRead();
    }
  };

  useEffect(() => {
    checkNewNotifs();
  }, [notifications]);

  return (
    <div className="notification-dropdown">
        <div onClick={handleClickNotifs} className="bell-icon">
          {newNotifs ? <VscBellDot /> : <VscBell />}
        </div>
      {showNotifs ? <div style={style} className="notification-list">
        {notifications.map((notification, index) => (
          <div className="notification" key={index}>
            {notification.message}
          </div>
        ))}
      </div> : null }
    </div>
  );
};

export default NotificationDropdown;
