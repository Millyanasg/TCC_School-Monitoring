import { create } from 'zustand';

/**
 * Tipo que representa o estado do menu.
 */
type MenuState = {
  /** Indica se o menu está aberto. */
  isOpen: boolean;
  /** Função para alternar o estado do menu. */
  toggleMenu: () => void;
  /** Função para fechar o menu. */
  closeMenu: () => void;
};

/**
 * Hook para gerenciar o estado do menu.
 *
 * @returns {MenuState} O estado e funções para controlar o menu.
 */
export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  closeMenu: () => set({ isOpen: false }),
}));
