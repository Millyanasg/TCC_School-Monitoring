import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function fetchHomeAddresses() {
  const response = await apiInstance.get<HomeAddressViewDto[]>('/home-address');
  return response.data;
}

export async function updateHomeAddress(data: HomeAddressViewDto) {
  const response = await apiInstance.put<HomeAddressViewDto>(
    '/home-address',
    data,
  );
  return response.data;
}
export async function addHomeAddress(data: HomeAddressDto) {
  const response = await apiInstance.post<HomeAddressViewDto>(
    '/home-address',
    data,
  );
  return response.data;
}
export async function removeHomeAddress(data: HomeAddressViewDto) {
  const response = await apiInstance.delete<HomeAddressViewDto>(
    '/home-address',
    {
      params: {
        ...data,
      },
    },
  );
  return response.data;
}
