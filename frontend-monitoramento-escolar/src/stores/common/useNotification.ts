import { MaskProps, Toast } from 'antd-mobile';
import { ReactNode } from 'react';
import { create } from 'zustand';

type Notification = {
  afterClose?: () => void;
  maskStyle?: MaskProps['style'];
  maskClassName?: string;
  maskClickable?: boolean;
  content?: string;
  icon?: 'success' | 'fail' | 'loading' | ReactNode;
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
};

/**
 * Custom hook to handle notifications.
 *
 * This hook provides a method to trigger notifications using the browser's Notification API
 * and a fallback to a Toast notification if the Notification API is not supported or permission is denied.
 *
 * @returns {Object} An object containing the `triggerNotification` function.
 *
 * @function triggerNotification
 * @param {Notification} notification - The notification object containing the content to be displayed.
 *
 * @example
 * ```typescript
 * const { triggerNotification } = useNotification();
 *
 * triggerNotification({
 *   content: 'This is a notification message',
 * });
 *```
 *
 * @remarks
 * - If the browser does not support the Notification API, a Toast notification will be shown with a message indicating the lack of support.
 * - If the Notification API is supported but permission is not granted, the hook will request permission to show notifications.
 * - If permission is granted, a notification will be shown with the provided content.
 */
export const useNotification = create<{
  triggerNotification: (notification: Notification) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}>((_set, _get) => {
  function triggerNotification(notification: Notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.content || '');
    }
    Toast.show(notification);
  }

  if (!('Notification' in window)) {
    Toast.show({
      content: 'Esse navegador não suporta notificações',
      duration: 2000,
    });
  } else if (Notification.permission !== 'denied') {
    // If permission is not denied, request permission
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        triggerNotification({
          content: 'Notificações habilitadas',
        });
      }
    });
  }

  return {
    triggerNotification,
  };
});
