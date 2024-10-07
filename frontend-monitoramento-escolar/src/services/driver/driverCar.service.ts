import { DriverDto } from '@backend/driver/dto/DriverDto';
import { DriverViewDto } from '@backend/driver/dto/DriverViewDto';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function getDriver() {
  return await apiInstance.get<DriverViewDto>('/driver');
}

export async function updateDriver(data: DriverDto) {
  return await apiInstance.put<DriverViewDto>('/driver', data);
}
