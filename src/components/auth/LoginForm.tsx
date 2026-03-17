import { CloseOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import './Auth.css'

type LoginFormValues = {
  username: string;
  password: string;
  remember: boolean;
}

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>();

  const handleClearUsername = () => {
    form.setFieldValue('username', '');
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className='wrapper-auth'>
      <div className="auth-windows">
        <div className='auth-inner-windows'>
          <h1>Добро пожаловать!</h1>
          <h3>Пожалуйста, авторизуйтесь</h3>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: false }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              layout='vertical'
              label='Логин'
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                suffix={(<CloseOutlined
                  onClick={handleClearUsername}
                  style={{ cursor: 'pointer' }}
                />)}
              />
            </Form.Item>
            <Form.Item
              layout='vertical'
              label='Пароль'
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password  prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Запомнить данные</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Войти
              </Button>
              или Нет аккаунта? <a href="">Создать</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};