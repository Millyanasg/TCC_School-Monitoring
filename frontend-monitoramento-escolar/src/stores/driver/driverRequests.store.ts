import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import {
  acceptDriverRequest,
  declineDriverRequest,
  getDriverRequests,
} from '@frontend/services/driver/driverRequests.service';
import { create } from 'zustand';
type DriverRequests = {
  loadDriverRequests: () => Promise<unknown>;
  requests: InviteDriverDto[];
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
  const loadDriverRequests = async () => {
    try {
      return await getDriverRequestsStore();
    } catch {
      set({ requests: [] });
    }
  };
  const getDriverRequestsStore = async () => {
    const data = (await getDriverRequests()).data;
    set({ requests: data });
    return data;
  };
  const acceptDriverRequestStore = async (id: number) => {
    await acceptDriverRequest(id);
    await loadDriverRequests();
  };
  const declineDriverRequestStore = async (id: number) => {
    await declineDriverRequest(id);
    await loadDriverRequests();
  };

  return {
    loadDriverRequests: loadDriverRequests,
    requests: [],
    acceptDriverRequest: acceptDriverRequestStore,
    declineDriverRequest: declineDriverRequestStore,
  };
});
