import { Steps } from 'antd-mobile';
import { Step } from 'antd-mobile/es/components/steps/step';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';

export function UserRegistrySteps() {
  const [type, step] = useRegisterStep(
    useShallow((state) => [state.type, state.step]),
  );
  return (
    <>
      {type === 'unset' && (
        <Steps current={step} direction='horizontal'>
          <Step title='Seleção de perfil' description='Escolha seu perfil' />
          <Step title='...' description='Selecione um perfil' />
          <Step title='Finalização' description='Finalize o cadastro' />
        </Steps>
      )}
      {type === 'parent' && (
        <Steps current={step} direction='horizontal'>
          <Step title='Seleção de perfil' description='Escolha seu perfil' />
          <Step title='Crianças' description='Cadastre seus filhos' />
          <Step title='Endereços' description='Cadastre seus endereços' />
          <Step title='Finalização' description='Finalize o cadastro' />
        </Steps>
      )}
      {type === 'driver' && (
        <Steps current={step} direction='horizontal'>
          <Step title='Seleção de perfil' description='Escolha seu perfil' />
          <Step title='Veículo' description='Informe o veículo' />
          <Step title='Finalização' description='Finalize o cadastro' />
        </Steps>
      )}
    </>
  );
}
