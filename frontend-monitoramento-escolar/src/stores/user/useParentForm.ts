import { create } from 'zustand';
import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { ChildDto } from '@backend/parent/dto/ChildDto';

export const useParentForm = create<{
  children: ChildDto[];
  homeAddress: HomeAddressDto[];
  addChildren: (children: ChildDto) => void;
  removeChild: (index: number) => void;
  addHomeAddress: (homeAddress: HomeAddressDto) => void;
  removeHomeAddress: (index: number) => void;
}>((set) => {
  function addChildren(children: ChildDto) {
    set((state) => {
      return {
        ...state,
        children: [...state.children, children],
      };
    });
  }
  function removeChild(index: number) {
    set((state) => {
      return {
        ...state,
        children: state.children.filter((_, i) => i !== index),
      };
    });
  }
  function addHomeAddress(homeAddress: HomeAddressDto) {
    set((state) => {
      return {
        ...state,
        homeAddress: [...state.homeAddress, homeAddress],
      };
    });
  }
  function removeHomeAddress(index: number) {
    set((state) => {
      return {
        ...state,
        homeAddress: state.homeAddress.filter((_, i) => i !== index),
      };
    });
  }
  return {
    children: [],
    homeAddress: [],
    addChildren: addChildren,
    removeChild: removeChild,
    addHomeAddress: addHomeAddress,
    removeHomeAddress: removeHomeAddress,
  };
});
