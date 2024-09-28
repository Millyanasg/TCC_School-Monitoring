import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';
import { HomeAddressForm } from './HomeAddressForm';
import { ChildrenForm } from './ChildrenForm';

export function ParentForm() {
  const step = useRegisterStep(useShallow((state) => state.step));
  return (
    <>
      {step === 1 && <ChildrenForm />}
      {step === 2 && <HomeAddressForm />}
    </>
  );
}
