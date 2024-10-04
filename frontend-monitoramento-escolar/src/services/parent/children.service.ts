import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function fetchChildren() {
  const response = await apiInstance.get<ChildViewDto[]>('/children');
  return response.data;
}

export async function updateChildren(data: ChildViewDto) {
  const response = await apiInstance.put<ChildViewDto>('/children', data);
  return response.data;
}
export async function addChildren(data: ChildViewDto) {
  const response = await apiInstance.post<ChildViewDto>('/children', data);
  return response.data;
}
export async function removeChildren(data: ChildViewDto) {
  const response = await apiInstance.delete<ChildViewDto>('/children', {
    params: {
      id: data.id,
    },
  });
  return response.data;
}
