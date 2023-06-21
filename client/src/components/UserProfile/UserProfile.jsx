import React, { useState, useEffect } from 'react';

function UserProfile () {
  return (
  <div className="profile">
    <h1>User Profile</h1>
    <div className="avatar">
      <div className="w-24 rounded">
        <img src="https://media.licdn.com/dms/image/C4E03AQF71ce2tzlB4g/profile-displayphoto-shrink_800_800/0/1516925996316?e=1692230400&v=beta&t=zwbXHCHnHhnf2FnVGWj2VFZsAloc7dXnjCajMd7-RoE" />
      </div>
    </div>
  </div>
  );
};

export default UserProfile;
