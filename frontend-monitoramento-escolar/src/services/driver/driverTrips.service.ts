import { apiInstance } from '@frontend/stores/common/api.store';

export async function getDriverTrips() {
  return await apiInstance.get('/driver/trips');
}
