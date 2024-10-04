import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button } from 'antd';
import { Card } from 'antd-mobile';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/shallow';

export function ChildCard({ child }: { child: ChildViewDto }) {
  const [deleteSelectedChild, setSelectedChild, setOpenModal] =
    useChildrenStore(
      useShallow((state) => [
        state.removeChild,
        state.setSelectedChild,
        state.setIsEditing,
      ]),
    );
  function removeChild() {
    setSelectedChild(child);
    deleteSelectedChild(child);
  }
  function editChild() {
    setOpenModal(true);
    setSelectedChild(child);
  }

  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={
        <>
          <Button
            onClick={removeChild}
            color='danger'
            variant='solid'
            size='small'
            icon={<DeleteOutlined />}
          >
            Excluir
          </Button>
          <Button
            onClick={editChild}
            color='primary'
            variant='solid'
            size='small'
            icon={<EditOutlined />}
          >
            Editar
          </Button>
        </>
      }
    >
      <div>
        <p>Data de nascimento: {dayjs(child.birthDate).format('DD/MM/YYYY')}</p>
        <p>Ano escolar: {child.grade}</p>
      </div>
    </Card>
  );
}
