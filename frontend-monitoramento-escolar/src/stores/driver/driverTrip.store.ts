import {
  Trip,
  fetchGetCurrentTrip,
  fetchStartTrip,
  fetchUpdatePosition,
} from '@frontend/services/driver/driverTrip.service';
import { create } from 'zustand';

export type GeoPosition = {
  coords: { latitude: number; longitude: number };
};
type useDriverTripState = {
  isOnGoingTrip: boolean;
  getCurrentTrip: () => Promise<Trip | null>;
  updatePosition: (position: GeoPosition) => Promise<void>;
  startTrip: (childId: string) => Promise<Trip>;
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
  const updatePosition = async (position: GeoPosition) => {
    await fetchUpdatePosition(position);
  };
  const startTrip = async (childId: string) => {
    const trip = await fetchStartTrip(childId);
    set({ isOnGoingTrip: true });
    return trip;
  };

  const getCurrentTrip = async () => {
    const trip = await fetchGetCurrentTrip();
    if (trip) {
      set({ isOnGoingTrip: true });
    }
    return trip;
  };

  return {
    isOnGoingTrip: false,
    updatePosition,
    getCurrentTrip,
    startTrip,
  };
});
