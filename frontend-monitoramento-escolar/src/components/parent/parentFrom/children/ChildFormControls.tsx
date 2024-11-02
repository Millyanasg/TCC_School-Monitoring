import { PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { Button } from 'antd';
import { LeftOutline, RightOutline } from 'antd-mobile-icons';
import { useShallow } from 'zustand/shallow';

export const ChildFormControls = () => {
  const { triggerNotification } = useNotification();
  const length = useParentForm(useShallow((state) => state.children.length));
  const [setType, nextStep, prevStep] = useRegisterStep(
    useShallow((state) => [state.setType, state.nextStep, state.prevStep]),
  );
  return (
    <>
      <Button
        block
        icon={<PlusOutlined />}
        color='primary'
        variant='solid'
        htmlType='submit'
        size='large'
      >
        Adicionar
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={() => {
            setType('unset');
            prevStep();
          }}
          color='primary'
          style={{
            marginTop: '2rem',
          }}
          size='middle'
          icon={<LeftOutline />}
          iconPosition='start'
          variant='filled'
        >
          Anterior
        </Button>
        <Button
          onClick={() => {
            if (length === 0) {
              triggerNotification({
                content: 'Adicione pelo menos uma criança',
              });
            } else {
              nextStep();
            }
          }}
          color='primary'
          style={{
            marginTop: '2rem',
          }}
          size='middle'
          icon={<RightOutline />}
          iconPosition='end'
          variant='filled'
        >
          Próximo
        </Button>
      </div>
    </>
  );
};
