import { create } from 'zustand';

interface PositionState {
  location: GeolocationPosition | null;
  initializePosition: () => () => void;
}
/**
 * Custom hook to manage the user's geolocation position using Zustand and local storage.
 *
 * @returns {PositionState} The state containing the user's current location and a function to initialize position tracking.
 *
 * @function initializePosition
 * Initializes the geolocation tracking. It gets the current position and sets up a watcher to track position changes.
 *
 * @returns {void}
 *
 * @example
 * ```tsx
 * const { location, initializePosition } = usePositionStore();
 *
 * useEffect(() => {
 *  initializePosition();
 * }, []);
 * ```
 *
 * @typedef {Object} PositionState
 * @property {GeolocationPosition | null} location - The current geolocation position of the user.
 * @property {Function} initializePosition - Function to start tracking the user's position.
 */
export const usePositionStore = create<PositionState>((set) => {
  function initializePosition() {
    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({ location: position });
      },
      (error) => {
        console.error('Error getting current position:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    // Watch the position as it changes
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        set({ location: position });
        console.debug('Position changed:', position);
      },
      (error) => {
        console.error('Error watching position:', error);
      },
      {
        maximumAge: 30_000,
        timeout: 10_000,
        enableHighAccuracy: true,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }
  return {
    location: null,
    initializePosition,
  };
});
