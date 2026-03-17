import { CloseOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Alert } from 'antd';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import './Auth.css';

type LoginFormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const { login, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const localToken = localStorage.getItem('auth-storage');
    
    if (sessionToken || localToken) {
      // Токен уже есть в store через persist
    }
  }, []);

  const handleClearUsername = () => {
    form.setFieldValue('username', '');
  };

  const onFinish = async (values: LoginFormValues) => {
    try {
      await login(values.username, values.password, values.remember);
      toast.success('Успешный вход!');
    } catch (error) {
      // Ошибка обрабатывается в store
    }
  };

  return (
    <div className='wrapper-auth'>
      <div className="auth-windows">
        <div className='auth-inner-windows'>
          <h1>Добро пожаловать!</h1>
          <h3>Пожалуйста, авторизуйтесь</h3>
          
          {error && (
            <Alert
              message="Ошибка авторизации"
              description={error}
              type="error"
              showIcon
              closable
              onClose={clearError}
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            form={form}
            name="login"
            initialValues={{ remember: false }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label='Логин'
              name="username"
              rules={[
                { required: true, message: 'Введите логин!' },
                { min: 3, message: 'Логин должен быть не менее 3 символов' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Логин"
                suffix={
                  <CloseOutlined
                    onClick={handleClearUsername}
                    style={{ cursor: 'pointer' }}
                  />
                }
              />
            </Form.Item>

            <Form.Item
              label='Пароль'
              name="password"
              rules={[
                { required: true, message: 'Введите пароль!' },
                { min: 4, message: 'Пароль должен быть не менее 4 символов' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Запомнить данные</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button 
                block 
                type="primary" 
                htmlType="submit"
                loading={isLoading}
              >
                Войти
              </Button>
              <div style={{ marginTop: 8, textAlign: 'center' }}>
                или <a href="#">Нет аккаунта?</a>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
                Тестовые данные: emilys / emilyspass
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};