import { apiInstance } from '@frontend/stores/common/api.store';
import { DriverRequestInfoViewDto } from '@backend/driver/dto/DriverRequestInfoViewDto';
export async function getDriverRequests() {
  return apiInstance.get<DriverRequestInfoViewDto[]>('/driver/requests');
}
export async function acceptDriverRequest(id: number) {
  return apiInstance.put('/driver/requests', null, { params: { id } });
}
export async function declineDriverRequest(id: number) {
  return apiInstance.delete('/driver/requests', { params: { id } });
}
