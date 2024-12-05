// The following code is inspired by https://github.com/strapi/strapi/blob/39c02e972392ee1add553a2577b6626e8772fcae/packages/core/admin/admin/src/components/Notifications/index.js

import React, { useState } from "react";

import { NotifyProvider } from "@strapi/admin/strapi-admin";

import Notification from "./Notification";

const Notifications = ({ children }) => {
  const [notification, setNotification] = useState(undefined);

  const displayNotification = (config) => {
    setNotification(config);
  };

  const onClose = () => {
    setNotification(undefined);
  };

  return (
    <NotifyProvider toggleNotification={displayNotification}>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          marginLeft: '-250px',
          top: '2.875rem', // 46/16 rem
          width: '31.25rem', // 500/16 rem
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem', // spacing(2)
        }}
      >
        {notification && (
          <Notification
            key={notification.id}
            onClose={onClose}
            notification={notification}
          />
        )}
      </div>
      {children}
    </NotifyProvider>
  );
};

export default Notifications;
