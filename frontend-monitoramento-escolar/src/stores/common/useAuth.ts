import { create } from 'zustand';
export const useAuth = create<{
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  register: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => void;
  logout: () => void;
}>((set) => ({
  isAuthenticated: false,
  login: async ({ email, password }) => {
    // Handle login logic here
    console.log('Login:', email, password);
    set({ isAuthenticated: true });
  },
  register: async ({ name, email, password }) => {
    // Handle register logic here
    console.log('Register:', name, email, password);
    set({ isAuthenticated: true });
  },
  logout: () => {
    // Handle logout logic here
    console.log('Logout');
    set({ isAuthenticated: false });
  },
}));
