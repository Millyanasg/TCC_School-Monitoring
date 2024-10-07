import { ChildDto } from '@backend/parent/dto/ChildDto';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import {
  fetchChildren,
  updateChildren,
  addChildren,
  removeChildren,
} from '@frontend/services/parent/children.service';
import { create } from 'zustand';

type ChildrenStore = {
  children: ChildViewDto[];

  selectedChild: ChildViewDto | null;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => boolean;
  setSelectedChild: (child: ChildViewDto | null) => ChildViewDto | null;
  updateChild: (children: ChildViewDto) => Promise<ChildViewDto>;

  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => boolean;
  addChild: (children: ChildDto) => Promise<ChildViewDto>;

  removeChild: (children: ChildViewDto) => Promise<ChildViewDto>;
};

/**
 * A Zustand store for managing the state of children.
 *
 * @returns {ChildrenStore} The Zustand store with the following properties and methods:
 *
 * @property {ChildViewDto[]} children - The list of children.
 *
 * @method updateChildren - Updates the state of a specific child.
 * @param {ChildViewDto} children - The child data to update.
 * @returns {Promise<void>} A promise that resolves when the state is updated.
 *
 * @method addChildren - Adds a new child to the state.
 * @param {ChildViewDto} child - The new child data to add.
 * @returns {Promise<void>} A promise that resolves when the state is updated.
 *
 * @method removeChildren - Removes a child from the state.
 * @param {ChildViewDto} child - The child data to remove.
 * @returns {Promise<void>} A promise that resolves when the state is updated.
 *
 * @method updateState - Fetches the list of children and updates the state.
 * @returns {Promise<void>} A promise that resolves when the state is updated.
 *
 * @example
 * ```tsx
 * const { children, updateChildren, addChildren, removeChildren, setSelectedChild, selectedChild } = useChildrenStore();
 *
 * useEffect(() => {
 *  console.log(children);
 * }, []);
 * ```
 */
export const useChildrenStore = create<ChildrenStore>((set) => {
  async function updateChildrenState(children: ChildViewDto) {
    await updateChildren(children);
    await updateState();
    return children;
  }
  async function addChildrenState(child: ChildDto) {
    const newChild = await addChildren(child);
    set((state) => ({ children: [...state.children, newChild] }));
    return newChild;
  }
  async function removeChildrenState(child: ChildViewDto) {
    await removeChildren(child);
    set((state) => ({
      children: state.children.filter((c) => c.id !== child.id),
    }));
    return child;
  }

  async function updateState() {
    try {
      const childList = await fetchChildren();
      set({ children: childList });
    } catch {
      set({ children: [] });
    }
  }

  updateState();

  return {
    children: [],
    selectedChild: null,
    setSelectedChild: (child) => {
      set({ selectedChild: child });
      return child;
    },
    isEditing: false,
    setIsEditing: (isEditing) => {
      set({ isEditing });
      return isEditing;
    },
    updateChild: updateChildrenState,

    isAdding: false,
    setIsAdding: (isAdding) => {
      set({ isAdding });
      return isAdding;
    },
    addChild: addChildrenState,
    removeChild: removeChildrenState,
  };
});
