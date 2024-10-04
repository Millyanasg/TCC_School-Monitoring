import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ChildDto } from '@backend/parent/dto/ChildDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, DatePicker, Flex, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';

export function AddChildModal() {
  const [isAdding, setIsAdding, addChild] = useChildrenStore(
    useShallow((state) => [state.isAdding, state.setIsAdding, state.addChild]),
  );
  const [form] = Form.useForm<ChildDto>();
  const { triggerNotification } = useNotification();

  function handleCancelAdd() {
    setIsAdding(false);
  }
  async function submitChild(values: ChildDto) {
    try {
      await addChild(values);
      triggerNotification({
        content: 'Criança adicionada com sucesso',
      });
      setIsAdding(false);
    } catch {
      triggerNotification({
        content: 'Erro ao adicionar a criança',
      });
    }
  }

  return (
    <Modal
      onCancel={handleCancelAdd}
      title='Adicionar criança'
      open={isAdding}
      footer={null}
    >
      <Form onFinish={submitChild} form={form}>
        <Form.Item
          label='Nome'
          name='name'
          rules={[
            { required: true, message: 'Por favor, insira o primeiro nome' },
          ]}
        >
          <Input placeholder='Primeiro Nome' />
        </Form.Item>
        <Form.Item
          label='Sobrenome'
          name='lastName'
          rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
        >
          <Input placeholder='Sobrenome' />
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
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item
          label='Ano escolar'
          name='grade'
          rules={[{ required: true, message: 'Por favor, insira a série' }]}
        >
          <Input placeholder='Série' />
        </Form.Item>
        <Flex justify='end' style={{ marginTop: '16px', marginBottom: '16px' }}>
          <Button
            icon={<DeleteOutlined />}
            onClick={handleCancelAdd}
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
