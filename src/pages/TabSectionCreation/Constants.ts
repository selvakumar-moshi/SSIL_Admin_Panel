import type { ITableColumn } from '../../components/Table/ITable';

export interface TabNameRecord {
    id: string;
    tabNameValue: string;
    createdAt?: string;
    updatedAt?: string;
}

export const TAB_INPUT_FIELDS = [
    {
        name: 'tabNameValue',
        label: 'Tab Name',
        placeholder: 'Enter Tab Name (e.g., Dashboard, Reports, Analytics)',
        required: true,
        type: 'text' as const,
        maxLength: 50,
        helpText: 'Tab name should be unique and between 3-50 characters',
    },
];

// Define columns without the actions render function
export const getTabTableColumns = (): ITableColumn[] => [
    {
        title: 'Tab Name',
        dataIndex: 'tabNameValue',
        key: 'tabNameValue',
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
        title: 'Last Updated',
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