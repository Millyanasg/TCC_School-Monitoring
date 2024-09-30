import { RegisterParentDto } from '@backend/parent/dto/RegisterDto';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function RegisterParent(registerDto: RegisterParentDto) {
  return apiInstance.post('parent/register', registerDto);
}
