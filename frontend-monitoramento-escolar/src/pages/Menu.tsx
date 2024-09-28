import { useUserStore } from '@frontend/stores/user/user.store';
import { Form } from 'antd-mobile';
import 'leaflet/dist/leaflet.css';
import { useShallow } from 'zustand/shallow';

import { Layout } from '@frontend/components/Layout/Layout';
import { ParentForm } from '@frontend/components/user/ParentForm';
import { UserRegistrySteps } from '@frontend/components/user/UserRegistrySteps';
import { UserTypeSelector } from '@frontend/components/user/UserTypeSelector';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';

function DriverForm() {
  const [form] = Form.useForm();
  return <Form form={form}></Form>;
}

function UserSetUpFrom() {
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

export function Menu() {
  const userData = useUserStore((state) => state.userData);
  return (
    <Layout>
      {userData && userData.type === 'unset' && <UserSetUpFrom />}
    </Layout>
  );
}
