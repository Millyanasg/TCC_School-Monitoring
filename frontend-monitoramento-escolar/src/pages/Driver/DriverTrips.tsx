import { CardDriverTrips } from '@frontend/components/driver/DriverTrips/Card';
import { Layout } from '@frontend/components/Layout/Layout';

export function DriverTripsPage() {
  return (
    <Layout>
      <CardDriverTrips
        addressChild='Rua Cichele 15, VilaCentral- Japeri'
        child='Liz Helena'
        duration='15 min'
        time='13:00'
        addressSchool='Rua trasmontana 20, Caramujos - Japeri'
      />
    </Layout>
  );
}
