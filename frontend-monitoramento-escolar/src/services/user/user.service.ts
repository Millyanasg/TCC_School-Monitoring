import { UserDto } from '@backend/user/dto/userDTO';
import { apiInstance } from '@stores/common/api.store';
export async function getProfile() {
  return apiInstance.get<UserDto>('/user/me');
}
