import { Steps } from 'antd-mobile';
import { Step } from 'antd-mobile/es/components/steps/step';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';

export function UserRegistrySteps() {
  const [type, step] = useRegisterStep(
    useShallow((state) => [state.type, state.step]),
  );
  return (
    <Steps current={step} direction='horizontal'>
      <Step title='Seleção de perfil' description='Escolha seu perfil' />
      {type === 'parent' && (
        <>
          <Step title='Crianças' description='Cadastre seus filhos' />
          <Step title='Endereços' description='Cadastre seus endereços' />
        </>
      )}
      {type === 'driver' && (
        <>
          <Step title='Veículo' description='Informe o veículo' />
        </>
      )}
      {type === 'unset' && <Step title='...' description='...' />}
      <Step title='Finalização' description='...' />
    </Steps>
  );
}
