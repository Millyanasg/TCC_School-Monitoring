import { TabBar } from 'antd-mobile';
import {
  CheckShieldOutline,
  EnvironmentOutline,
  SetOutline,
} from 'antd-mobile-icons';

export function Footer() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#D0D0D0',
      }}
    >
      <TabBar>
        <TabBar.Item title={<CheckShieldOutline fontSize={38} />} key='gps' />
        <TabBar.Item
          title={<EnvironmentOutline fontSize={38} />}
          key='confirm'
        />
        <TabBar.Item title={<SetOutline fontSize={38} />} key='settings' />
      </TabBar>
    </div>
  );
}
