import { Location } from '@backend/location/dto/Location';
import { apiInstance } from '@frontend/stores/common/api.store';

export const fetchChildrenLocation = async (childId: number) => {
  const response = await apiInstance.get<Location>('/location', {
    params: {
      childId,
    },
  });
  return response.data;
};
export const childrenSentOut = async (
  childId: number,
  latitude: number,
  longitude: number,
) => {
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
};

export const fetchCancelTrip = async (childId: number) => {
  const response = await apiInstance.post<Location>(
    '/location/cancel-trip',
    null,
    {
      params: {
        childId,
      },
    },
  );
  return response.data;
};
