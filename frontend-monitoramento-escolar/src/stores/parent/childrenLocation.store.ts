import { Location } from '@backend/location/dto/Location';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { fetchChildrenWithLocation } from '@frontend/services/parent/children.service';
import { fetchChildrenLocation } from '@frontend/services/parent/childrenLocation.service';
import { create } from 'zustand';
type ChildrenLocationStore = {
  loadChildren: () => Promise<unknown>;
  children: ChildViewDto[];
  sendChildLocation: (childId: number) => Promise<unknown>;
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

  const sendChildLocation = async (childId: number) => {
    console.log(childId);
    await loadChildrenData();
  };
  const getChildrenLocation = async (childId: number) => {
    const data = await fetchChildrenLocation(childId);
    return data;
  };

  return {
    sendChildLocation: sendChildLocation,
    getChildrenLocation: getChildrenLocation,
    loadChildren: loadChildrenData,
    children: [],
  };
});
