import { create } from 'zustand';

export const useRegisterStep = create<{
  type: 'parent' | 'driver' | 'unset';
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setType: (type: 'parent' | 'driver' | 'unset') => void;
}>((set, get) => {
  const nextStep = () => {
    const currentStep = get().step;
    set((state) => ({
      ...state,
      step: currentStep + 1,
    }));
  };
  const prevStep = () => {
    const currentStep = get().step;
    set((state) => ({
      ...state,
      step: currentStep - 1,
    }));
  };

  const setType = (type: 'parent' | 'driver' | 'unset') => {
    set((state) => ({
      ...state,
      type: type,
    }));
  };

  return {
    step: 0,
    nextStep: nextStep,
    prevStep: prevStep,
    type: 'unset',
    setType: setType,
  };
});
