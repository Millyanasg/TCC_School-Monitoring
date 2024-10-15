import { useShallow } from 'zustand/shallow';
import { UserRegistrySteps } from '@frontend/components/user/UserRegistrySteps';
import { UserTypeSelector } from '@frontend/components/user/UserTypeSelector';
import { DriverForm } from '@frontend/components/user/driverFrom/DriverForm';
import { ParentForm } from '@frontend/components/parent/parentFrom/ParentForm';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';

export function UserSetUpFrom() {
  const [step, type] = useRegisterStep(
    useShallow((state) => [state.step, state.type]),
  );
  return (
    <div>
      <UserRegistrySteps />
      {step === 0 && <UserTypeSelector />}
      {type === 'parent' && <ParentForm />}
      {type === 'driver' && <DriverForm />}
    </div>
  );
}
