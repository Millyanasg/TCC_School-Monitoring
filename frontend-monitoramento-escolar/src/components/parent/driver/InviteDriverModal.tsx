import { SendOutlined } from '@ant-design/icons';
import { InviteDriverByEmailDto } from '@backend/driver-invite/dto/InviteDriverByEmailDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { useDriverInviteStore } from '@frontend/stores/parent/driverInvite.store';
import { Button, Modal, Select } from 'antd';
import { Form, Input } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export function InviteDriverModal() {
  const setModalOpen = useDriverInviteStore(
    useShallow((state) => state.setModalOpen),
  );
  const driverInvite = useDriverInviteStore(
    useShallow((state) => state.inviteDriver),
  );
  const children = useChildrenStore(useShallow((state) => state.children));
  const loadChildren = useChildrenStore(
    useShallow((state) => state.loadChildren),
  );
  const { triggerNotification } = useNotification();
  const isModalOpen = useDriverInviteStore((state) => state.isModalOpen);
  const [form] = Form.useForm<AllStrings<InviteDriverByEmailDto>>();
  async function submit(values: AllStrings<InviteDriverByEmailDto>) {
    try {
      await driverInvite({
        email: values.email.trim(),
        childId: Number(values.childId),
      });
      triggerNotification({
        content: 'Motorista convidado com sucesso',
      });
      form.resetFields();
      setModalOpen(false);
    } catch (error: unknown) {
      if (error && (error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          triggerNotification({
            content: 'Motorista já convidado',
          });
        }
        if (axiosError.response?.status === 404) {
          triggerNotification({
            content: 'Motorista não encontrado',
          });
        }
      }
    }
  }

  async function handleCancel() {
    setModalOpen(false);
    form.resetFields();
  }

  useEffect(() => {
    loadChildren();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <Modal
      onCancel={handleCancel}
      title='Convidar motorista'
      open={isModalOpen}
      footer={null}
    >
      <Form onFinish={submit} form={form}>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Criança'
          name='childId'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
          style={{ marginBottom: 0, width: '100%' }}
        >
          <Select
            style={{ marginBottom: 0, width: '100%' }}
            onChange={(value) => form.setFieldsValue({ childId: value })}
          >
            {children.map((child) => (
              <Select.Option key={child.id} value={child.id}>
                {child.name} {child.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' icon={<SendOutlined />} htmlType='submit'>
            Convidar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
