import { DeleteOutlined } from '@ant-design/icons';
import { ChildDto } from '@backend/parent/dto/ChildDto';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { Button, Descriptions } from 'antd';
import { Card } from 'antd-mobile';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/shallow';

export function AddedChildCard({
  child,
  index,
  allowRemove = true,
}: {
  child: ChildDto;
  index: number;
  allowRemove?: boolean;
}) {
  const [removeChild] = useParentForm(
    useShallow((state) => [state.removeChild]),
  );
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={
        <>
          {allowRemove && (
            <Button
              onClick={() => removeChild(index)}
              color='danger'
              variant='solid'
              size='small'
              icon={<DeleteOutlined />}
            >
              Excluir
            </Button>
          )}
        </>
      }
    >
      <Descriptions title='Detalhes da Criança'>
        <Descriptions.Item label='Data de nascimento'>
          {dayjs(child.birthDate).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label='Ano escolar'>{child.grade}</Descriptions.Item>
        <Descriptions.Item label='Endereço'>
          {child.street}, {child.number}
        </Descriptions.Item>
        <Descriptions.Item label='Cidade'>{child.city}</Descriptions.Item>
        <Descriptions.Item label='Estado'>{child.state}</Descriptions.Item>
        <Descriptions.Item label='Latitude e Longitude '>
          {child.latitude.toFixed(2)}, {child.longitude.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
