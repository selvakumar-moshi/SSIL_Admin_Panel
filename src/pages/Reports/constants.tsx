// constants.tsx
import ActionIcons from '../../components/Table/ActionIcons';
import { renderS3UrlCell } from '../../utils/tableCellRender';

export interface Report {
    id: string;
    financialYearCode?: string;
    tabNameValue: string;
    title: string;
    mainDocument: string;
    s3Url: string;
    s3Key: string;
    fileSize: number;
    fileType: string;
    createdAt: string;
    updatedAt: string;
    downloadName?: string;
}

export interface ReportsGroupedData {
    [tabName: string]: {
        [financialYear: string]: Report[];
    };
}

export interface GroupedReportsSection {
    financialYear: string;
    reports: Report[];
}

export interface InputField {
    name: string;
    label: string;
    placeholder: string;
    required: boolean;
    type: 'text' | 'email' | 'password' | 'number';
    maxLength?: number;
}

export interface DropdownField {
    name: string;
    label: string;
    placeholder: string;
    required: boolean;
    options: Array<{ value: string; label: string }>;
    showSearch?: boolean;
    inputTestId?: string;
    disabled?: boolean;
}

export interface FormValues {
    tabName?: string;
    title?: string;
    financialYear?: string;
    [key: string]: string | string[] | undefined;
}

export interface FormErrors {
    tabName?: string;
    title?: string;
    financialYear?: string;
    fileUpload?: string;
    [key: string]: string | undefined;
}

// Input fields configuration
export const inputFields: InputField[] = [
    {
        name: 'title',
        label: 'Title',
        placeholder: 'Enter Title',
        required: false,
        type: 'text',
        maxLength: 100,
    },
];

// Dropdown fields configuration
export const getDropdownFields = (
    tabNameOptions: Array<{ value: string; label: string }>,
    financialYearOptions: Array<{ value: string; label: string }>
): DropdownField[] => {
    return [
        {
            name: 'tabName',
            label: 'Tab Name',
            placeholder: 'Select Tab Name',
            required: true,
            options: tabNameOptions,
            showSearch: true,
            inputTestId: 'tab-name-dropdown',
        },
        {
            name: 'financialYear',
            label: 'Financial Year',
            placeholder: 'Select Financial Year',
            required: true,
            options: financialYearOptions,
            showSearch: true,
            inputTestId: 'financial-year-dropdown',
        },
    ];
};

export const parseReportsGroupedData = (data: unknown): ReportsGroupedData => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {};
    }

    const grouped: ReportsGroupedData = {};

    Object.entries(data as Record<string, unknown>).forEach(([tabName, yearsData]) => {
        if (!yearsData || typeof yearsData !== 'object' || Array.isArray(yearsData)) {
            return;
        }

        grouped[tabName] = {};

        Object.entries(yearsData as Record<string, unknown>).forEach(([financialYear, reports]) => {
            if (!Array.isArray(reports)) {
                return;
            }

            grouped[tabName][financialYear] = reports.map((item: any) => ({
                id: item.id,
                financialYearCode: financialYear,
                tabNameValue: item.tabNameValue || tabName,
                title: item.title,
                mainDocument: item.mainDocument,
                s3Url: item.s3Url,
                s3Key: item.s3Key,
                fileSize: item.fileSize,
                fileType: item.fileType,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                downloadName: item.downloadName,
            }));
        });
    });

    return grouped;
};

export const getGroupedReportSections = (
    groupedData: ReportsGroupedData,
    tabName: string
): GroupedReportsSection[] => {
    const tabData = groupedData[tabName];
    if (!tabData) {
        return [];
    }

    return Object.entries(tabData)
        .map(([financialYear, reports]) => ({
            financialYear,
            reports,
        }))
        .sort((a, b) => b.financialYear.localeCompare(a.financialYear));
};

const formatReportDate = (date: string) =>
    date
        ? new Date(date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : '-';

// Table columns for grouped view (within a financial year section)
export const getGroupedColumns = (
    loadingActions: Record<string, Record<string, boolean>>,
    onActionClick: (action: string, record: Report) => void
) => [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'File Name',
        dataIndex: 'mainDocument',
        key: 'mainDocument',
        render: (text: string) => text || '-',
    },
    {
        title: 'S3 URL',
        dataIndex: 's3Url',
        key: 's3Url',
        render: (url: string) => renderS3UrlCell(url),
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: formatReportDate,
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: formatReportDate,
    },
    {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'actions',
        render: (_: unknown, record: Report) => (
            <ActionIcons
                actions={['view', 'edit', 'delete']}
                disabledActions={[]}
                loadingActions={loadingActions[record.id] || {}}
                onActionClick={(action, record) => onActionClick(action, record)}
                record={record}
            />
        ),
    },
];

// Table columns configuration
export const getColumns = (
    loadingActions: Record<string, Record<string, boolean>>, 
    onActionClick: (action: string, record: any) => void
) => [
    {
        title: 'Tab Name',
        dataIndex: 'tabNameValue',
        key: 'tabNameValue',
    },
    {
        title: 'Financial Year',
        dataIndex: 'financialYearCode',
        key: 'financialYearCode',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'File Name',
        dataIndex: 'mainDocument',
        key: 'mainDocument',
        render: (text: string) => text || '-',
    },
    {
        title: 'S3 URL',
        dataIndex: 's3Url',
        key: 's3Url',
        render: (url: string) => renderS3UrlCell(url),
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: formatReportDate,
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: formatReportDate,
    },
    {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'actions',
        render: (_: any, record: any) => (
            <ActionIcons
                actions={['view', 'edit', 'delete']}
                disabledActions={[]}
                loadingActions={loadingActions[record.id] || {}}  // Using id instead of key
                onActionClick={(action, record) => onActionClick(action, record)}
                record={record}
            />
        ),
    },
];