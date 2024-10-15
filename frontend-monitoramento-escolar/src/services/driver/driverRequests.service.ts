import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import { apiInstance } from '@frontend/stores/common/api.store';
export async function getDriverRequests() {
  return apiInstance.get<InviteDriverDto[]>('/driver-invite/driver');
}
export async function acceptDriverRequest(id: number) {
  return apiInstance.put('/driver-invite/driver', null, { params: { id } });
}
export async function declineDriverRequest(id: number) {
  return apiInstance.delete('/driver-invite/driver', { params: { id } });
}
