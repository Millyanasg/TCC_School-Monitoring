import { Location } from '@backend/location/dto/Location';
import { apiInstance } from '@frontend/stores/common/api.store';

export async function fetchChildrenLocation(childId: number) {
  const response = await apiInstance.get<Location>('/location', {
    params: {
      childId,
    },
  });
  return response.data;
}
export async function childrenSentOut(
  childId: number,
  latitude: number,
  longitude: number,
) {
  const response = await apiInstance.post<Location>(
    '/location/sent-out',
    null,
    {
      params: {
        childId,
        latitude,
        longitude,
      },
    },
  );
  return response.data;
}
