import { ToTopOutlined } from '@ant-design/icons';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { Button } from 'antd';
import { LeftOutline } from 'antd-mobile-icons';
import { useShallow } from 'zustand/shallow';

import { RegisterParent } from '@frontend/services/parent/parent.service';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { AxiosError } from 'axios';
import { AddedChildCard } from './AddedChildCard';
import { AddedHomeAddressCard } from './AddedHomeAddressCard';
import { useUserStore } from '@frontend/stores/user/user.store';
import { useNavigate } from 'react-router-dom';

export function ParentFormSummary() {
  const navigate = useNavigate();
  const { triggerNotification } = useNotification();
  const updateUserData = useUserStore(
    useShallow((state) => state.updateUserData),
  );
  const [homeAddressList, childrenList] = useParentForm(
    useShallow((state) => [state.homeAddress, state.children]),
  );
  async function submit() {
    try {
      await RegisterParent({
        children: childrenList,
        homeAddresses: homeAddressList,
      });
      await updateUserData();
      navigate('/');
      triggerNotification({
        content: 'Responsável cadastrado com sucesso',
      });
    } catch (e) {
      const error = e as AxiosError;
      if (error.isAxiosError) {
        switch (error.response?.status) {
          case 400:
            triggerNotification({
              content: 'Erro de validação',
            });
            break;
          case 409:
            triggerNotification({
              content: 'Usuário já cadastrado como responsável',
            });
            break;
          default:
            triggerNotification({
              content: 'Erro ao cadastrar responsável',
            });
            break;
        }
      }
    }
  }

  return (
    <>
      <h2>Resumo do cadastro</h2>
      <hr
        style={{
          marginBottom: '1rem',
        }}
      />
      <h3>Crianças cadastradas</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {childrenList.map((child, index) => (
          <AddedChildCard
            key={index}
            child={child}
            index={index}
            allowRemove={false}
          />
        ))}
      </div>

      <h3>Endereços cadastrados</h3>
      <div>
        {homeAddressList.map((homeAddress, index) => (
          <AddedHomeAddressCard
            key={index}
            homeAddress={homeAddress}
            index={index}
            allowRemove={false}
          />
        ))}
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        <Button
          onClick={() => {
            submit();
          }}
          color='primary'
          variant='solid'
          htmlType='submit'
          size='large'
          block
        >
          <ToTopOutlined /> Finalizar cadastro
        </Button>
        <Button
          onClick={() => {
            useRegisterStep.getState().prevStep();
          }}
          color='danger'
          variant='solid'
          size='large'
          block
        >
          <LeftOutline /> Voltar
        </Button>
      </div>
    </>
  );
}
