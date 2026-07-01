import { Card, Typography, Space } from 'antd';
import Button from "../../components/Button/Button";
import InputFields from '../../components/InputFields/InputFields';
import ToastMessages from '../../components/ToastMessages';
import { useLogin } from './useLoginHooks';
import { LOGIN_INPUT_FIELDS, REGISTER_INPUT_FIELDS } from './Constants';

const { Title, Text } = Typography;

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    jobTitle,
    setJobTitle,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    isRegisterMode,
    loading,
    handleLogin,
    handleRegister,
    handleKeyPress,
    toggleMode,
    toastMessages,
    hideToast,
  } = useLogin();

  const handleInputChange = (name: string, value: string) => {
    if (name === 'registerPassword') {
      return;
    }

    const setters: Record<string, (val: string) => void> = {
      email: setEmail,
      password: setPassword,
      firstName: setFirstName,
      lastName: setLastName,
      jobTitle: setJobTitle,
      registerEmail: setRegisterEmail,
      registerPassword: setRegisterPassword,
    };
    setters[name]?.(value);
  };

  const loginValues = { email, password };
  const registerValues = { firstName, lastName, jobTitle, registerEmail, registerPassword };

  return (
    <div className="login-container">
      <ToastMessages messages={toastMessages} onMessageClose={hideToast} />
      <Card className="login-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            {isRegisterMode ? 'Create Account' : 'Welcome Back'}
          </Title>
          <Title level={5} style={{ textAlign: 'center', color: '#666', marginTop: 0 }}>
            {isRegisterMode 
              ? 'Register to get started' 
              : 'Please login to your account'}
          </Title>
          
          <div onKeyPress={handleKeyPress}>
            {isRegisterMode ? (
              <>
                <InputFields
                  fields={REGISTER_INPUT_FIELDS}
                  values={registerValues}
                  onChange={handleInputChange}
                  disabled={loading}
                />

                <div className="form-field">
                  <Button 
                    variant="primary" 
                    className="page-title__button"
                    onClick={handleRegister}
                    loading={loading}
                    style={{ width: '100%' }}
                  >
                    Register
                  </Button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Text type="secondary">
                    Already have an account?{' '}
                    <span  style={{ color: '#1890ff', cursor: 'pointer' }} onClick={toggleMode}>
                      Login here
                    </span>
                  </Text>
                </div>
              </>
            ) : (
              <>
                <InputFields
                  fields={LOGIN_INPUT_FIELDS}
                  values={loginValues}
                  onChange={handleInputChange}
                  disabled={loading}
                />

                <div className="form-field">
                  <Button 
                    variant="primary" 
                    className="page-title__button"
                    onClick={handleLogin}
                    loading={loading}
                    style={{ width: '100%' }}
                  >
                    Log in
                  </Button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Text type="secondary">
                    Don't have an account?{' '}
                    <span 
                      style={{ color: '#1890ff', cursor: 'pointer' }}
                      onClick={toggleMode}
                    >
                      Register here
                    </span>
                  </Text>
                </div>
              </>
            )}
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;