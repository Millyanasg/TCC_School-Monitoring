import { GeoPosition } from './driverTrip.store';

export type Trip = {
  tripId: string;
  startLocation: GeoPosition;
  endLocation: GeoPosition;
};
export const fetchUpdatePosition = async (position: GeoPosition) => {
  console.log(
    `Updating position to ${position.coords.latitude}, ${position.coords.longitude}`,
  );
};
export const fetchGetCurrentTrip = async (): Promise<Trip | null> => {
  console.log('Getting current trip');
  return null;
};
export const fetchStartTrip = async (childId: string): Promise<Trip> => {
  console.log(`Starting trip for child ${childId}`);
  return {
    tripId: '123',
    startLocation: {
      coords: { latitude: 0, longitude: 0 },
    },
    endLocation: {
      coords: { latitude: 0, longitude: 0 },
    },
  };
};
