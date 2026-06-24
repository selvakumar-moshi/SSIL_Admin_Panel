import type { ITableColumn } from '../../components/Table/ITable';

export interface FinancialYearRecord {
    id: string;
    financialYearCode: string;
    createdAt?: string;
    updatedAt?: string;
}

export const FINANCIAL_INPUT_FIELDS = [
    {
        name: 'financialYearCode',
        label: 'Financial Year',
        placeholder: 'Enter Financial Year (e.g., 2024-2025)',
        required: true,
        type: 'text' as const,
        maxLength: 9,
        pattern: '^\\d{4}-\\d{4}$',
        helpText: 'Format: YYYY-YYYY (e.g., 2024-2025)',
    },
];

// Define columns without the actions render function
export const getFinancialTableColumns = (): ITableColumn[] => [
    {
        title: 'Financial Year',
        dataIndex: 'financialYearCode',
        key: 'financialYearCode',
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
];