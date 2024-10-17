import { UserDto } from '@backend/user/dto/userDTO';
import { apiInstance } from '@stores/common/api.store';
export const getProfile = async () => {
  return apiInstance.get<UserDto>('/user/me');
};
