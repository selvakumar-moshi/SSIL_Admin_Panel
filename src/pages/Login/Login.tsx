import { useState } from 'react';
import { Input, Card, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button/Button";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Basic validation
    if (!username.trim()) {
      message.error('Please input your username!');
      return;
    }
    if (!password.trim()) {
      message.error('Please input your password!');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Static credentials check
      if (username === 'admin' && password === 'Admin@123') {
        message.success('Login successful!');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/reports');
      } else {
        message.error('Invalid username or password!');
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
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
          
          <div onKeyPress={handleKeyPress}>
            <div className="form-field">
              <label className="form-label">
                Username <span style={{ color: 'red' }}>*</span>
              </label>
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter username" 
                size="large"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Password <span style={{ color: 'red' }}>*</span>
              </label>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onPressEnter={handleSubmit}
              />
            </div>

            <div className="form-field">
              <Button 
                variant="primary" 
                className="page-title__button"
                onClick={handleSubmit}
                loading={loading}
                style={{ width: '100%' }}
              >
                Log in
              </Button>
            </div>

            <div style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '16px' }}>
              <p>Demo Credentials:</p>
              <p>Username: admin | Password: Admin@123</p>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;