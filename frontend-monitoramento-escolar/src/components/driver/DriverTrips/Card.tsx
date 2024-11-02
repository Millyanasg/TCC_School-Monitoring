import { Typography } from 'antd';
import { Card } from 'antd-mobile';

type TCard = {
  child: string;
  andress: string;
  time: string;
  duraction: string;
};
export const CardDriverTrips = ({ andress, child, duraction, time }: TCard) => {
  return (
    <Card
      title={child}
      headerStyle={{ backgroundColor: '#f1f1f1' }}
      style={{ border: '1px solid #c1c1c1', padding: '0px' }}
    >
      <Typography>{andress}</Typography>
      <Typography>{duraction}</Typography>
      <Typography>{time}</Typography>
    </Card>
  );
};
