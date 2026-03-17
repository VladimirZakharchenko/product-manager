import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { useProductStore } from '../../store/productStore';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

interface ProductFormValues {
  title: string;
  price: number;
  brand: string;
  article?: string;
}

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [form] = Form.useForm<ProductFormValues>();
  const addProduct = useProductStore(state => state.addProduct);

  const handleSubmit = (values: ProductFormValues) => {
    addProduct({
      title: values.title,
      price: values.price,
      brand: values.brand,
      article: values.article || `ART-${Date.now()}`,
    });
    
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Добавить новый товар"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ price: 0 }}
      >
        <Form.Item
          name="title"
          label="Наименование"
          rules={[{ required: true, message: 'Введите наименование товара' }]}
        >
          <Input placeholder="Название товара" />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Вендор"
          rules={[{ required: true, message: 'Введите вендора' }]}
        >
          <Input placeholder="Вендор" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Цена"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.01}
            placeholder="Цена"
          />
        </Form.Item>

        <Form.Item
          name="article"
          label="Артикул"
        >
          <Input placeholder="Артикул (необязательно)" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};