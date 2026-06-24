import ActionIcons from '../../components/Table/ActionIcons';

export interface Report {
  key: string;
  name: string;
  pdfurl: string;
  date: string;
  status?: string;
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

export interface FolderNode {
  name: string;
  key: string;
  children?: FolderNode[];
}

export interface FormValues {
  tabName?: string;
  parentFolder?: string;
  subFolder?: string;
  subSubFolder?: string;
  title?: string;
  financialYear?: string;
  [key: string]: string | string[] | undefined;
}

export interface FormErrors {
  tabName?: string;
  parentFolder?: string;
  subFolder?: string;
  subSubFolder?: string;
  title?: string;
  financialYear?: string;
  fileUpload?: string;
  [key: string]: string | undefined;
}

// Folder structure
export const folderStructure: FolderNode[] = [
  {
    name: 'Disclosure Under Regulation 46',
    key: 'Disclosure-Under-Regulation-46',
    children: [
      {
        name: 'Financial',
        key: 'Financial',
        children: [
          {
            name: 'Quarterly Results',
            key: 'Quarterly-Results',
          }
        ]
      },
      {
        name: 'Financial Results',
        key: 'Financial+Results',
      }
    ]
  }
];

// Function to get parent folder options
export const getParentFolderOptions = () => {
  return folderStructure.map(folder => ({
    value: folder.key,
    label: folder.name
  }));
};

// Function to get sub folder options based on selected parent
export const getSubFolderOptions = (parentKey: string) => {
  const parent = folderStructure.find(f => f.key === parentKey);
  if (parent && parent.children) {
    return parent.children.map(child => ({
      value: child.key,
      label: child.name
    }));
  }
  return [];
};

// Function to get sub-sub folder options based on selected parent and sub folder
export const getSubSubFolderOptions = (parentKey: string, subFolderKey: string) => {
  const parent = folderStructure.find(f => f.key === parentKey);
  if (parent && parent.children) {
    const subFolder = parent.children.find(c => c.key === subFolderKey);
    if (subFolder && subFolder.children) {
      return subFolder.children.map(child => ({
        value: child.key,
        label: child.name
      }));
    }
  }
  return [];
};

// Function to get full folder path display
export const getFolderPath = (parentKey: string, subFolderKey?: string, subSubFolderKey?: string): string => {
  const parent = folderStructure.find(f => f.key === parentKey);
  if (!parent) return '';
  
  let path = parent.name;
  
  if (subFolderKey && parent.children) {
    const subFolder = parent.children.find(c => c.key === subFolderKey);
    if (subFolder) {
      path += ` > ${subFolder.name}`;
      
      if (subSubFolderKey && subFolder.children) {
        const subSubFolder = subFolder.children.find(c => c.key === subSubFolderKey);
        if (subSubFolder) {
          path += ` > ${subSubFolder.name}`;
        }
      }
    }
  }
  
  return path;
};

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

// Dropdown fields configuration (without folder fields as they're dynamic)
export const getDropdownFields = (
  tabNameOptions: Array<{ value: string; label: string }>,
  financialYearOptions: Array<{ value: string; label: string }>,
  parentFolderDisabled: boolean = false,
  subFolderDisabled: boolean = true,
  subSubFolderDisabled: boolean = true,
  parentFolderOptions: Array<{ value: string; label: string }> = [],
  subFolderOptions: Array<{ value: string; label: string }> = [],
  subSubFolderOptions: Array<{ value: string; label: string }> = []
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
      name: 'parentFolder',
      label: 'Parent Folder',
      placeholder: 'Select Parent Folder',
      required: true,
      options: parentFolderOptions,
      showSearch: true,
      inputTestId: 'parent-folder-dropdown',
      disabled: parentFolderDisabled,
    },
    {
      name: 'subFolder',
      label: 'Sub Folder',
      placeholder: 'Select Sub Folder',
      required: false,
      options: subFolderOptions,
      showSearch: true,
      inputTestId: 'sub-folder-dropdown',
      disabled: subFolderDisabled,
    },
    {
      name: 'subSubFolder',
      label: 'Sub Folder',
      placeholder: 'Select Sub Folder',
      required: false,
      options: subSubFolderOptions,
      showSearch: true,
      inputTestId: 'sub-sub-folder-dropdown',
      disabled: subSubFolderDisabled,
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

// Table columns configuration
export const getColumns = (loadingActions: Record<string, Record<string, boolean>>, onActionClick: (action: string, record: any) => void) => [
  {
    title: 'Report Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Folder Path',
    dataIndex: 'folderPath',
    key: 'folderPath',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'PDF URL',
    dataIndex: 'pdfurl',
    key: 'pdfurl',
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    render: (_: any, record: any) => (
      <ActionIcons
        actions={['view', 'download', 'edit', 'delete']}
        disabledActions={[]}
        loadingActions={loadingActions[record.key] || {}}
        onActionClick={(action, record) => onActionClick(action, record)}
        record={record}
      />
    ),
  },
];