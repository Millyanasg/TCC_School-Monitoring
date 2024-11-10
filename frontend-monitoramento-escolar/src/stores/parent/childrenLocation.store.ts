import { Location } from '@backend/location/dto/Location';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { fetchChildrenWithLocation } from '@frontend/services/parent/children.service';
import {
  childrenSentOut,
  fetchChildrenLocation,
  fetchCancelTrip,
} from '@frontend/services/parent/childrenLocation.service';
import { create } from 'zustand';
type ChildrenLocationStore = {
  loadChildren: () => Promise<unknown>;
  children: ChildViewWithLocationDto[];
  sendChildSentOut: (
    childId: number,
    latitude: number,
    longitude: number,
  ) => Promise<unknown>;
  getChildrenLocation: (childId: number) => Promise<Location>;
  cancelTrip: (childId: number) => Promise<unknown>;
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

  const cancelTrip = async (childId: number) => {
    await fetchCancelTrip(childId);
    await loadChildrenData();
  };

  return {
    cancelTrip: cancelTrip,
    sendChildSentOut: sendChildSentOut,
    getChildrenLocation: getChildrenLocation,
    loadChildren: loadChildrenData,
    children: [],
  };
});
