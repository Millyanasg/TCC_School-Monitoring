import { create } from 'zustand';

type DriverTrips = {
  trips: {
    foo: string;
  }[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useDriverTrips = create<DriverTrips>((_set) => {
  return {
    trips: [],
  };
});
