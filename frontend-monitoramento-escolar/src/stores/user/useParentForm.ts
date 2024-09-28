import { create } from 'zustand';

export type Child = {
  name: string;
  lastName: string;
  age: number;
  grade: string;
};

export type HomeAddress = {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  latitute: string;
  longitude: string;
};

export const useParentForm = create<{
  children: Child[];
  homeAddress: HomeAddress[];
  addChildren: (children: Child) => void;
  removeChild: (index: number) => void;
  addHomeAddress: (homeAddress: HomeAddress) => void;
  removeHomeAddress: (index: number) => void;
}>((set) => {
  function addChildren(children: Child) {
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
  function addHomeAddress(homeAddress: HomeAddress) {
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
