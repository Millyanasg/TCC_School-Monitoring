import { ChildDto } from '@backend/parent/dto/ChildDto';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { DatePicker } from 'antd';
import { Form, Input } from 'antd-mobile';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/shallow';
import { ChildFormControls } from './ChildFormControls';

export const AddChildForm = () => {
  const addChildren = useParentForm(useShallow((state) => state.addChildren));
  const [form] = Form.useForm<AllStrings<ChildDto>>();
  return (
    <Form
      form={form}
      onFinish={(values: AllStrings<ChildDto>) => {
        addChildren({
          name: values.name.trim(),
          lastName: values.lastName.trim(),
          birthDate: dayjs(values.birthDate).toDate(),
          grade: values.grade,
        });
        form.resetFields();
      }}
      footer={<ChildFormControls />}
    >
      <Form.Item
        name='name'
        label='Nome'
        rules={[
          {
            required: true,
            message: 'Por favor, insira o primeiro nome',
          },
        ]}
      >
        <Input placeholder='Primeiro Nome' />
      </Form.Item>
      <Form.Item
        name='lastName'
        label='Sobrenome'
        rules={[
          {
            required: true,
            message: 'Por favor, insira o sobrenome',
          },
        ]}
      >
        <Input placeholder='Sobrenome' />
      </Form.Item>
      <Form.Item required label='Data de Nascimento'>
        <DatePicker
          maxDate={dayjs()}
          onChange={(date) => {
            console.log(date);
            const parsedBirthDate = dayjs(date).toDate();
            form.setFieldsValue({
              birthDate: parsedBirthDate.toString(),
            });
          }}
          format={'DD/MM/YYYY'}
        />
      </Form.Item>
      <Form.Item
        name='grade'
        label='Série'
        rules={[
          {
            required: true,
            message: 'Por favor, insira a série',
          },
        ]}
      >
        <Input placeholder='Série' />
      </Form.Item>
    </Form>
  );
};
