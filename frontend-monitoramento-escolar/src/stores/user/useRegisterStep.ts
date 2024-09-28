import { create } from 'zustand';

export const useRegisterStep = create<{
  type: 'parent' | 'driver' | 'unset';
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setType: (type: 'parent' | 'driver') => void;
}>((set, get) => {
  function nextStep() {
    const currentStep = get().step;
    set((state) => ({
      ...state,
      step: currentStep + 1,
    }));
  }
  function prevStep() {
    const currentStep = get().step;
    set((state) => ({
      ...state,
      step: currentStep - 1,
    }));
  }

  function setType(type: 'parent' | 'driver') {
    set((state) => ({
      ...state,
      type: type,
    }));
  }

  return {
    step: 0,
    nextStep: nextStep,
    prevStep: prevStep,
    type: 'unset',
    setType: setType,
  };
});
