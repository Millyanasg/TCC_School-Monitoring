import { CarOutlined, HomeOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';

export function UserTypeSelector() {
  const [setType, nextStep] = useRegisterStep(
    useShallow((state) => [state.setType, state.nextStep]),
  );

  const handleSetType = useCallback(
    (type: 'parent' | 'driver') => {
      setType(type);
      nextStep();
    },
    [nextStep, setType],
  );

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const iconStyleFontSize = '8rem';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '1rem',
        marginTop: '6rem',
      }}
    >
      <button style={buttonStyle} onClick={() => handleSetType('parent')}>
        <HomeOutlined
          style={{
            fontSize: iconStyleFontSize,
          }}
        />
        Responsável
      </button>
      <button style={buttonStyle} onClick={() => handleSetType('driver')}>
        <CarOutlined
          style={{
            fontSize: iconStyleFontSize,
          }}
        />
        Motorista
      </button>
    </div>
  );
}
