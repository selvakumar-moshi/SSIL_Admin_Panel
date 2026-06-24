import { useState, useEffect } from 'react';
import { Input, Card, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../components/Button/Button";
import { getSSLogin } from '../../services/SuperSalesAction';
import { resetSSLogin } from '../../services/CSuperSales';
import type { RootState } from '../../services/Store';

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get login state from Redux
  const { loading, SSLoginData, apiStatus } = useSelector(
    (state: RootState) => state.superSales
  );

  // Handle login response
  useEffect(() => {
    if (apiStatus.SSLoginData.success && SSLoginData) {
      message.success('Login successful!');
      navigate('/reports');
      dispatch(resetSSLogin());
    }

    if (apiStatus.SSLoginData.error) {
      message.error(apiStatus.SSLoginData.error || 'Invalid email or password!');
      dispatch(resetSSLogin());
    }
  }, [apiStatus.SSLoginData.success, apiStatus.SSLoginData.error, SSLoginData, navigate, dispatch]);

  const handleSubmit = () => {
    // Basic validation
    if (!email.trim()) {
      message.error('Please input your email!');
      return;
    }
    if (!password.trim()) {
      message.error('Please input your password!');
      return;
    }

    // Dispatch login action
    dispatch(getSSLogin({ email, password }) as any);
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
                Email <span style={{ color: 'red' }}>*</span>
              </label>
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter email" 
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <p>Email: selva@gmail.com | Password: Admin@123</p>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;