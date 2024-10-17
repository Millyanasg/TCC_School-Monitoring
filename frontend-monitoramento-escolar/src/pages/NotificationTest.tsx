import { Button } from 'antd-mobile';
import { useNotification } from '../stores/common/useNotification';

export const NotificationTest = () => {
  const { triggerNotification } = useNotification();
  return (
    <div style={{ padding: '20px' }}>
      <Button
        onClick={() => {
          triggerNotification({
            content: 'This is a notification message',
          });
        }}
      >
        Show Notification
      </Button>
    </div>
  );
};
