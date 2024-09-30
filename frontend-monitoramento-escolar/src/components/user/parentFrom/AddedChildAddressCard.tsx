import { DeleteOutlined } from '@ant-design/icons';
import { ChildDto } from '@backend/parent/dto/ChildDto';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { Button } from 'antd';
import { Card } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';

export function AddedChildAddressCard({
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
      <div>
        <p>Idade: {child.age}</p>
        <p>Ano escolar: {child.grade}</p>
      </div>
    </Card>
  );
}
