import { Form } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { DriverDto } from '@backend/driver/dto/DriverDto';
import { DriverSummary } from './DriverSummary';
import { VehicleDetailsForm } from './VehicleDetailsForm';

export function DriverForm() {
  const step = useRegisterStep(useShallow((state) => state.step));
  const [form] = Form.useForm<AllStrings<DriverDto>>();
  return (
    <>
      {step === 1 && <VehicleDetailsForm form={form} />}
      {step === 2 && <DriverSummary form={form} />}
    </>
  );
}
