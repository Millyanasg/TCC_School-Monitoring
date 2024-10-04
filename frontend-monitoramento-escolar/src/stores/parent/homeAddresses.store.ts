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
  async function updateHomeAddressState(address: HomeAddressViewDto) {
    await updateHomeAddress(address);
    await updateState();
    return address;
  }
  async function addHomeAddressState(child: HomeAddressDto) {
    const newHomeAddress = await addHomeAddress(child);
    set((state) => ({
      homeAddresses: [...state.homeAddresses, newHomeAddress],
    }));
    return newHomeAddress;
  }
  async function removeHomeAddressState(child: HomeAddressViewDto) {
    await removeHomeAddress(child);
    set((state) => ({
      homeAddresses: state.homeAddresses.filter((c) => c.id !== child.id),
    }));
    return child;
  }

  async function updateState() {
    const childList = await fetchHomeAddresses();
    set({ homeAddresses: childList });
  }

  updateState();

  return {
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
