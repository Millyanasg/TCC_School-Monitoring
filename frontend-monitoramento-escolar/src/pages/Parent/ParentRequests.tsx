import { DriverRequestInfoViewDto } from '@backend/driver/dto/DriverRequestInfoViewDto';
import { Layout } from '@frontend/components/Layout/Layout';
import { useDriverRequests } from '@frontend/stores/driver/driverRequests.store';
import { useShallow } from 'zustand/shallow';

function RequestCard({ request }: { request: DriverRequestInfoViewDto }) {
  const { createdAt, driver, id, parent, status, updatedAt } = request;
  return (
    <div>
      <p>{createdAt.toString()}</p>
      <p>{driver.name}</p>
      <p>{id}</p>
      <p>{parent.name}</p>
      <p>{status}</p>
      <p>{updatedAt.toString()}</p>
    </div>
  );
}
export function DriverRequestsPage() {
  const requests = useDriverRequests(useShallow((state) => state.requests));
  return (
    <Layout>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </Layout>
  );
}
