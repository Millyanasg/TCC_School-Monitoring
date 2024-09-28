import { useNavigate } from 'react-router-dom';
export function Header() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginBottom: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        top: 0,
        zIndex: 1000,
      }}
    >
      <p
        style={{
          color: '#000',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          lineHeight: '1.5rem',
        }}
        onClick={() => navigate('/')}
      >
        Monitoramento Escolar
      </p>
    </div>
  );
}
