import { create } from 'zustand';
import { UserDto } from '@backend/user/dto/userDTO';
import { getProfile } from '@frontend/services/user/user.service';
import { createJSONStorage, persist } from 'zustand/middleware';
type UserState = {
  loadProfile: () => Promise<unknown>;
  userData: UserDto | null;
  updateUserData: () => Promise<void>;
};

/**
 * Creates a Zustand store for managing user state.
 *
 * @returns An object containing the user data.
 *
 * @remarks
 * This store initializes by attempting to fetch the user profile data.
 * If the fetch is successful, the user data is set in the store.
 * If the fetch fails, the user data is cleared and an error is logged.
 *
 * @example
 * ```typescript
 * const userStore = useUserStore();
 * const userData = userStore.userData;
 * ```
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => {
      const setUserData = (userData: UserDto) => set({ userData });
      function clearUserData() {
        return set({ userData: null });
      }
      async function updateUserData() {
        getProfile()
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.error('Error getting user profile:', error);
            clearUserData();
          });
      }
      return {
        loadProfile: () =>
          getProfile()
            .then((response) => {
              setUserData(response.data);
            })
            .catch((error) => {
              console.error('Error getting user profile:', error);
              clearUserData();
            }),
        userData: null,
        updateUserData,
      };
    },
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
