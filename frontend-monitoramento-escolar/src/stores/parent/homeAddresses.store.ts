import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import {
  addHomeAddress,
  fetchHomeAddresses,
  removeHomeAddress,
  updateHomeAddress,
} from '@frontend/services/parent/homeAddresses.service';
import { create } from 'zustand';

type HomeAddressStore = {
  loadChildren: () => Promise<unknown>;
  homeAddresses: HomeAddressViewDto[];

  selectedHomeAddress: HomeAddressViewDto | null;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => boolean;
  setSelectedHomeAddress: (
    address: HomeAddressViewDto | null,
  ) => HomeAddressViewDto | null;
  updateHomeAddress: (
    address: HomeAddressViewDto,
  ) => Promise<HomeAddressViewDto>;

  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => boolean;
  addHomeAddress: (address: HomeAddressDto) => Promise<HomeAddressViewDto>;

  removeHomeAddress: (
    address: HomeAddressViewDto,
  ) => Promise<HomeAddressViewDto>;
};

export const useHomeAddressStore = create<HomeAddressStore>((set) => {
  const updateHomeAddressState = async (address: HomeAddressViewDto) => {
    await updateHomeAddress(address);
    await updateState();
    return address;
  };
  const addHomeAddressState = async (child: HomeAddressDto) => {
    const newHomeAddress = await addHomeAddress(child);
    set((state) => ({
      homeAddresses: [...state.homeAddresses, newHomeAddress],
    }));
    return newHomeAddress;
  };
  const removeHomeAddressState = async (child: HomeAddressViewDto) => {
    await removeHomeAddress(child);
    await updateState();
    return child;
  };

  const updateState = async () => {
    try {
      const homeAddressList = await fetchHomeAddresses();
      set({ homeAddresses: homeAddressList });
    } catch {
      set({ homeAddresses: [] });
    }
  };

  return {
    loadChildren: () => updateState(),
    homeAddresses: [],
    selectedHomeAddress: null,
    setSelectedHomeAddress: (child) => {
      set({ selectedHomeAddress: child });
      return child;
    },
    isEditing: false,
    setIsEditing: (isEditing) => {
      set({ isEditing });
      return isEditing;
    },
    updateHomeAddress: updateHomeAddressState,

    isAdding: false,
    setIsAdding: (isAdding) => {
      set({ isAdding });
      return isAdding;
    },
    addHomeAddress: addHomeAddressState,
    removeHomeAddress: removeHomeAddressState,
  };
});
