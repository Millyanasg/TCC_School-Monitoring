import { InviteDriverByEmailDto } from '@backend/driver-invite/dto/InviteDriverByEmailDto';
import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import {
  fetchInvitedDrivers,
  inviteDriverByEmail,
  deleteDriverInviteById,
} from '@frontend/services/parent/driverInvite.service';
import { create } from 'zustand';

type driverInvitationStore = {
  updateState: () => Promise<unknown>;
  inviteDriver: (data: InviteDriverByEmailDto) => Promise<unknown>;
  deleteDriverInvite: (id: number) => Promise<unknown>;
  invitedDrivers: InviteDriverDto[];
  isInviting: boolean;
  setModalOpen: (isModalOpen: boolean) => boolean;
  isModalOpen: boolean;
};

export const useDriverInviteStore = create<driverInvitationStore>((set) => {
  const inviteDriverState = async (data: InviteDriverByEmailDto) => {
    set({ isInviting: true });
    await inviteDriverByEmail(data);
    await updateState();
    set({ isInviting: false });
  };

  const deleteDriverInvite = async (id: number) => {
    await deleteDriverInviteById(id);
    await updateState();
  };

  const updateState = async () => {
    try {
      const invitedDrivers = await fetchInvitedDrivers();
      set({ invitedDrivers });
    } catch {
      set({ invitedDrivers: [] });
    }
  };

  return {
    updateState: updateState,
    inviteDriver: inviteDriverState,
    deleteDriverInvite: deleteDriverInvite,
    isInviting: false,
    setModalOpen: (isModalOpen: boolean) => {
      set({ isModalOpen });
      return isModalOpen;
    },
    isModalOpen: false,
    invitedDrivers: [],
  };
});
