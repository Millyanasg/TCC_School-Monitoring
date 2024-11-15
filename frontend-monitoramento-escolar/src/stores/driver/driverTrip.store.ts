import {
  fetchStartTrip,
  getDistance,
  watchDriverPosition,
} from '@frontend/services/driver/driverTrip.service';
import { create } from 'zustand';

export type GeoPosition = {
  coords: { latitude: number; longitude: number };
};
type useDriverTripState = {
  isOnGoingTrip: boolean;
  startTrip: (
    startLocation: { latitude: number; longitude: number },
    endLocation: { latitude: number; longitude: number },
  ) => Promise<void>;
  stopTracking: () => void;
};

/**
 * Custom hook to manage driver trips.
 *
 * @returns {useDriverTripState} The state and actions for managing driver trips.
 *
 * @function
 * @name useDriverTrip
 *
 * @example
 * const { isOnGoingTrip, updatePosition, startTrip } = useDriverTrip();
 *
 * @typedef {Object} useDriverTripState
 * @property {boolean} isOnGoingTrip - Indicates if a trip is currently ongoing.
 * @property {function(GeoPosition): void} updatePosition - Updates the driver's position.
 * @property {function(string): {tripId: string, startLocation: GeoPosition, endLocation: GeoPosition}} startTrip - Starts a trip for a specified child.
 *
 * @param {function} set - Function to update the state.
 */

export const useDriverTrip = create<useDriverTripState>((set) => {
  let watchId: number | null = null;

  const startTrip = async (
    startLocation: { latitude: number; longitude: number },
    endLocation: { latitude: number; longitude: number },
  ) => {
    try {
      const tripData = await fetchStartTrip(startLocation, endLocation);
      console.log('Dados da viagem:', tripData);

      set({ isOnGoingTrip: true });

      watchId = watchDriverPosition(async (position: GeolocationPosition) => {
        console.log('Posição atual do motorista:', position.coords);
        await getDistance(endLocation, position.coords);
      });
    } catch (error) {
      console.error('Erro ao iniciar a viagem:', error);
    }
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      set({ isOnGoingTrip: false });
      console.log('Rastreamento parado.');
    }
  };

  return {
    isOnGoingTrip: false,
    startTrip,
    stopTracking,
  };
});
