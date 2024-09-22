import { TabBar } from 'antd-mobile';

export function Footer() {
  return (
    <TabBar>
      <TabBar.Item title='Home' key='home' />
      <TabBar.Item title='Settings' key='settings' />
    </TabBar>
  );
}
