import { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Static credentials check
      if (values.username === 'admin' && values.password === 'Admin@123') {
        message.success('Login successful!');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/reports');
      } else {
        message.error('Invalid username or password!');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            Welcome Back
          </Title>
          <Title level={5} style={{ textAlign: 'center', color: '#666', marginTop: 0 }}>
            Please login to your account
          </Title>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter username" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">
                Log in
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', color: '#999', fontSize: '12px' }}>
              <p>Demo Credentials:</p>
              <p>Username: admin | Password: Admin@123</p>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;