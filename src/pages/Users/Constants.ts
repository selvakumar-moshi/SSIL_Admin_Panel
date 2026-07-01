// Users/Constants.ts
import type { ITableColumn } from '../../components/Table/ITable';

export interface UserRecord {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const USER_INPUT_FIELDS = [
    {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter first name',
        required: true,
        type: 'text' as const,
    },
    {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter last name',
        required: true,
        type: 'text' as const,
    },
    {
        name: 'jobTitle',
        label: 'Job Title',
        placeholder: 'Enter job title',
        required: true,
        type: 'text' as const,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter email address',
        required: true,
        type: 'email' as const,
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter password (min 6 characters)',
        required: false,
        type: 'password' as const,
        helpText: 'Leave blank to keep current password',
    },
];

// Define columns without the actions render function
export const getUserTableColumns = (): ITableColumn[] => [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Job Title',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => date ? new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }) : '-',
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (date: string) => date ? new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }) : '-',
    },
];