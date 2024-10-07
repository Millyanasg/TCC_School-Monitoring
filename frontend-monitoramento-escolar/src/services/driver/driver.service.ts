import { DriverDto } from '@backend/driver/dto/DriverDto';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function RegisterDiver(values: DriverDto) {
  return await apiInstance.post('/driver/register', values);
}
