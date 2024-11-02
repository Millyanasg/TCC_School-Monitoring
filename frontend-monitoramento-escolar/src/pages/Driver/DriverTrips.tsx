import { CardDriverTrips } from '@frontend/components/driver/DriverTrips/Card';
import { Layout } from '@frontend/components/Layout/Layout';

export function DriverTripsPage() {
  return (
    <Layout>
      <CardDriverTrips
        andress='Rua Cichele 15'
        child='Liz Helena'
        duraction='15 min'
        time='13:00'
      />
    </Layout>
  );
}
