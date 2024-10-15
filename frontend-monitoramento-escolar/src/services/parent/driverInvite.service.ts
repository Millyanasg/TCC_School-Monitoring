import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import { InviteDriverByEmailDto } from '@backend/driver-invite/dto/InviteDriverByEmailDto';
import { apiInstance } from '@frontend/stores/common/api.store';
export async function inviteDriverByEmail(
  inviteDriverData: InviteDriverByEmailDto,
) {
  const response = await apiInstance.post<unknown>(
    '/driver-invite',
    inviteDriverData,
  );
  return response.data;
}

export async function fetchInvitedDrivers() {
  const response = await apiInstance.get<InviteDriverDto[]>('/driver-invite');
  return response.data;
}

export async function deleteDriverInviteById(id: number) {
  const response = await apiInstance.delete<unknown>('/driver-invite', {
    params: { id },
  });
  return response.data;
}
