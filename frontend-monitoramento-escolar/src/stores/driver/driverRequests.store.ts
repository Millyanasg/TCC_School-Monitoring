import { DriverRequestInfoViewDto } from '@backend/driver/dto/DriverRequestInfoViewDto';
import {
  acceptDriverRequest,
  declineDriverRequest,
  getDriverRequests,
} from '@frontend/services/driver/driverRequests.service';
import { create } from 'zustand';
type DriverRequests = {
  loadDriverRequests: () => Promise<unknown>;
  requests: DriverRequestInfoViewDto[];
  acceptDriverRequest: (id: number) => Promise<void>;
  declineDriverRequest: (id: number) => Promise<void>;
};

/**
 * Custom hook to manage driver requests.
 *
 * This hook provides functionalities to fetch, accept, and decline driver requests.
 *
 * @returns {object} An object containing:
 * - `requests`: An array of driver requests.
 * - `acceptDriverRequest`: A function to accept a driver request by ID.
 * - `declineDriverRequest`: A function to decline a driver request by ID.
 *
 * @example
 * ```tsx
 * const { requests, acceptDriverRequest, declineDriverRequest } = useDriverRequests();
 * ```
 */
export const useDriverRequests = create<DriverRequests>((set) => {
  async function getDriverRequestsStore() {
    const data = (await getDriverRequests()).data;
    set({ requests: data });
    return data;
  }
  async function acceptDriverRequestStore(id: number) {
    await acceptDriverRequest(id);
  }
  async function declineDriverRequestStore(id: number) {
    await declineDriverRequest(id);
  }

  return {
    loadDriverRequests: () =>
      getDriverRequestsStore().catch((error) => {
        console.error(error);
        set({ requests: [] });
      }),
    requests: [],
    acceptDriverRequest: acceptDriverRequestStore,
    declineDriverRequest: declineDriverRequestStore,
  };
});
