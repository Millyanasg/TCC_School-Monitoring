import { ChildDto } from '@backend/parent/dto/ChildDto';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function fetchChildren(location = false) {
  const response = await apiInstance.get<ChildViewDto[]>('/children', {
    params: {
      location,
    },
  });
  return response.data;
}

export async function fetchChildrenWithLocation() {
  const response = await apiInstance.get<ChildViewWithLocationDto[]>(
    '/children',
    {
      params: {
        location: true,
      },
    },
  );
  return response.data;
}

export async function updateChildren(data: ChildViewDto) {
  const response = await apiInstance.put<ChildViewDto>('/children', data);
  return response.data;
}
export async function addChildren(data: ChildDto) {
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
