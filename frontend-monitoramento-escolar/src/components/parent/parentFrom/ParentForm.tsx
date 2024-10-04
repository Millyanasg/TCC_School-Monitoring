import { useShallow } from 'zustand/shallow';

import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { ChildrenForm } from './ChildrenForm';
import { HomeAddressForm } from './HomeAddressForm';
import { ParentFormSummary } from './ParentFormSummary';

export function ParentForm() {
  const step = useRegisterStep(useShallow((state) => state.step));
  return (
    <>
      {step === 1 && <ChildrenForm />}
      {step === 2 && <HomeAddressForm />}
      {step === 3 && <ParentFormSummary />}
    </>
  );
}
