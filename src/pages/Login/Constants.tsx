import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import type { InputField } from '../../components/InputFields/InputFields';

export const DEFAULT_REGISTER_PASSWORD = 'Welcome@123';

export const LOGIN_INPUT_FIELDS: InputField[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    required: true,
    type: 'email',
    prefix: <MailOutlined />,
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    required: true,
    type: 'password',
    prefix: <LockOutlined />,
  },
];

export const REGISTER_INPUT_FIELDS: InputField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    required: true,
    type: 'text',
    prefix: <UserOutlined />,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    required: true,
    type: 'text',
    prefix: <UserOutlined />,
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    placeholder: 'Enter job title',
    required: true,
    type: 'text',
    prefix: <IdcardOutlined />,
  },
  {
    name: 'registerEmail',
    label: 'Email',
    placeholder: 'Enter email',
    required: true,
    type: 'email',
    prefix: <MailOutlined />,
  },
  {
    name: 'registerPassword',
    label: 'Password',
    placeholder: 'Default password',
    required: true,
    type: 'password',
    prefix: <LockOutlined />,
    disabled: true,
    visibilityToggle: true,
  },
];
