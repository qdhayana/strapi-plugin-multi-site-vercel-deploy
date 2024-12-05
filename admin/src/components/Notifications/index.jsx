import React, { useRef, useState, useCallback, useMemo, useContext } from 'react';
import { Flex } from '@strapi/design-system';
import { NotificationsContext } from './NotificationsContext';
import Notification from './Notification';

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  return context;
};

const Notifications = ({ children }) => {
  const notificationIdRef = useRef(0);
  const [notifications, setNotifications] = useState([]);

  const toggleNotification = useCallback(({
    type,
    message,
    link,
    timeout,
    blockTransition,
    onClose,
    title
  }) => {
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      {
        id: notificationIdRef.current++,
        type,
        message,
        link,
        timeout,
        blockTransition,
        onClose,
        title
      }
    ]);
  }, []);

  const clearNotification = useCallback((id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const value = useMemo(() => ({ toggleNotification }), [toggleNotification]);

  return (
    <NotificationsContext.Provider value={value}>
      <Flex
        left="50%"
        marginLeft="-250px"
        position="fixed"
        direction="column"
        alignItems="stretch"
        gap={2}
        top={`${46 / 16}rem`}
        width={`${500 / 16}rem`}
        zIndex={10}
      >
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            clearNotification={clearNotification}
          />
        ))}
      </Flex>
      {children}
    </NotificationsContext.Provider>
  );
};

export default Notifications;