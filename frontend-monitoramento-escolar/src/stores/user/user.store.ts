import { create } from 'zustand';
import { UserDto } from '@backend/user/dto/userDTO';
import { getProfile } from '@frontend/services/user/user.service';
type UserState = {
  userData: UserDto | null;
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
export const useUserStore = create<UserState>((set) => {
  const setUserData = (userData: UserDto) => set({ userData });
  const clearUserData = () => set({ userData: null });
  getProfile()
    .then((response) => {
      setUserData(response.data);
    })
    .catch((error) => {
      console.error('Error getting user profile:', error);
      clearUserData();
    });
  return {
    userData: null,
  };
});
