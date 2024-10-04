import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, DatePicker, Flex, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/shallow';

export function EditChildModal() {
  const [
    selectedChild,
    isEditing,
    setIsEditing,
    setSelectedChild,
    updateChild,
  ] = useChildrenStore(
    useShallow((state) => [
      state.selectedChild,
      state.isEditing,
      state.setIsEditing,
      state.setSelectedChild,
      state.updateChild,
    ]),
  );
  const [form] = Form.useForm<ChildViewDto>();
  const { triggerNotification } = useNotification();

  function handleCancelEdit() {
    setIsEditing(false);
    setSelectedChild(null);
  }
  async function submitChildUpdate(values: ChildViewDto) {
    try {
      await updateChild(values);
      triggerNotification({
        content: 'Criança atualizada com sucesso',
      });
      setIsEditing(false);
      setSelectedChild(null);
    } catch {
      triggerNotification({
        content: 'Erro ao atualizar a criança',
      });
    }
  }

  return (
    <Modal
      onCancel={handleCancelEdit}
      title='Editar criança'
      open={isEditing}
      footer={null}
    >
      <Form
        onFinish={submitChildUpdate}
        key={selectedChild?.id || 'new'}
        form={form}
        initialValues={{
          id: selectedChild?.id || '',
          name: selectedChild?.name || '',
          lastName: selectedChild?.lastName || '',
          birthDate: selectedChild?.birthDate
            ? dayjs(selectedChild?.birthDate)
            : undefined,
          grade: selectedChild?.grade || '',
        }}
      >
        <Form.Item
          initialValue={selectedChild?.id || ''}
          label='Id'
          hidden
          name='id'
        ></Form.Item>
        <Form.Item
          label='Nome'
          name='name'
          rules={[
            { required: true, message: 'Por favor, insira o primeiro nome' },
          ]}
        >
          <Input
            defaultValue={selectedChild?.name || ''}
            placeholder='Primeiro Nome'
          />
        </Form.Item>
        <Form.Item
          label='Sobrenome'
          name='lastName'
          rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
        >
          <Input
            defaultValue={selectedChild?.lastName || ''}
            placeholder='Sobrenome'
            value='Sobrenome'
          />
        </Form.Item>
        <Form.Item
          label='Data de nascimento'
          name='birthDate'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a data de nascimento',
            },
            { type: 'date', message: 'Insira uma data válida' },
          ]}
        >
          <DatePicker
            onChange={(date) => {
              console.log(date);
              form.setFieldsValue({
                birthDate: date.toDate(),
              });
            }}
            format={'DD/MM/YYYY'}
            key={selectedChild?.id || 'new'}
            defaultValue={
              selectedChild?.birthDate
                ? dayjs(selectedChild?.birthDate)
                : dayjs(new Date())
            }
          />
        </Form.Item>
        <Form.Item
          label='Ano escolar'
          name='grade'
          rules={[{ required: true, message: 'Por favor, insira a série' }]}
        >
          <Input
            defaultValue={selectedChild?.grade || ''}
            placeholder='Série'
          />
        </Form.Item>
        <Flex justify='end' style={{ marginTop: '16px', marginBottom: '16px' }}>
          <Button
            icon={<DeleteOutlined />}
            onClick={handleCancelEdit}
            color='danger'
            variant='solid'
          >
            Cancelar
          </Button>
          <Button
            icon={<EditOutlined />}
            color='primary'
            variant='solid'
            htmlType='submit'
          >
            Salvar
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
