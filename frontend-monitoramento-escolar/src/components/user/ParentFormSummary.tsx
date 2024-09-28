import { ToTopOutlined } from '@ant-design/icons';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { Button } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';
import { AddedChildAddressCard } from './ChildrenForm';
import { AddedHomeAddressCard } from './HomeAddressForm';

export function ParentFormSummary() {
  const [homeAddressList, childrenList] = useParentForm(
    useShallow((state) => [state.homeAddress, state.children]),
  );
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
          <AddedChildAddressCard
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
            console.log('Cadastro finalizado');
          }}
          type='button'
          color='success'
          block
        >
          <ToTopOutlined /> Finalizar cadastro
        </Button>
        <Button
          onClick={() => {
            useRegisterStep.getState().prevStep();
          }}
          type='button'
          color='warning'
          block
        >
          <LeftOutline /> Voltar
        </Button>
      </div>
    </>
  );
}
