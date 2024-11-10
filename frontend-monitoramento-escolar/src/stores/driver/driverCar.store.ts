import { DriverDto } from '@backend/driver/dto/DriverDto';
import { DriverViewDto } from '@backend/driver/dto/DriverViewDto';
import {
  getDriver,
  updateDriver,
} from '@frontend/services/driver/driverCar.service';
import { create } from 'zustand';
type DriverCar = {
  loadDriver: () => Promise<unknown>;
  driver: DriverViewDto | null;
  updateDriver: (data: DriverDto) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

/**
 * Custom hook to manage the state of a driver car.
 *
 * This hook uses the `create` function to initialize the state with a driver object.
 * It fetches the driver data asynchronously and updates the state accordingly.
 *
 * @returns {object} An object containing the driver state and a function to update the driver state.
 *
 * @property {Driver | null} driver - The current driver state, initially set to null.
 * @property {function} updateDriver - An asynchronous function to update the driver state.
 *
 * @example
 * const { driver, updateDriver, isEditing, setIsEditing } = useDriverCar();
 *
 * // To update the driver state
 * updateDriver(newDriverData);
 */
export const useDriverCar = create<DriverCar>((set) => {
  async function updateDriverState(data: DriverDto) {
    const respose = await updateDriver(data);
    const driver = respose.data;
    set({ driver });
  }
  return {
    loadDriver: () =>
      getDriver().then((respose) => set({ driver: respose.data })),
    driver: null,
    updateDriver: updateDriverState,
    isEditing: false,
    setIsEditing: (isEditing: boolean) => set({ isEditing }),
  };
});
