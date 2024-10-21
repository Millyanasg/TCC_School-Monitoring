import { Location } from '@backend/location/dto/Location';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { fetchChildrenWithLocation } from '@frontend/services/parent/children.service';
import {
  childrenSentOut,
  fetchChildrenLocation,
} from '@frontend/services/parent/childrenLocation.service';
import { create } from 'zustand';
type ChildrenLocationStore = {
  loadChildren: () => Promise<unknown>;
  children: ChildViewDto[];
  sendChildSentOut: (
    childId: number,
    latitude: number,
    longitude: number,
  ) => Promise<unknown>;
  getChildrenLocation: (childId: number) => Promise<Location>;
};

export const useChildrenLocation = create<ChildrenLocationStore>((set) => {
  const loadChildrenData = async () => {
    try {
      const childList = await fetchChildrenWithLocation();
      set({ children: childList });
    } catch {
      set({ children: [] });
    }
  };

  const sendChildSentOut = async (
    childId: number,
    latitude: number,
    longitude: number,
  ) => {
    await childrenSentOut(childId, latitude, longitude);
    await loadChildrenData();
  };
  const getChildrenLocation = async (childId: number) => {
    const data = await fetchChildrenLocation(childId);
    return data;
  };

  return {
    sendChildSentOut: sendChildSentOut,
    getChildrenLocation: getChildrenLocation,
    loadChildren: loadChildrenData,
    children: [],
  };
});
