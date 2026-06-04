import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { Report, FormValues } from './constants';
import { getParentFolderOptions, getSubFolderOptions, getSubSubFolderOptions, getFolderPath} from './constants';

export const useReports = () => {
  // Table states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Report[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  
  // Form states
  const [formValues, setFormValues] = useState<FormValues>({});
  
  // Folder dropdown options states
  const [parentFolderOptions, setParentFolderOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [subFolderOptions, setSubFolderOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [subSubFolderOptions, setSubSubFolderOptions] = useState<Array<{ value: string; label: string }>>([]);
  
  // Dropdown disabled states
  const [isSubFolderDisabled, setIsSubFolderDisabled] = useState(true);
  const [isSubSubFolderDisabled, setIsSubSubFolderDisabled] = useState(true);

  // Initialize parent folder options
  useEffect(() => {
    setParentFolderOptions(getParentFolderOptions());
  }, []);

  // Mock data fetch function - replace with actual API call
  const fetchReports = useCallback(async (page: number, size: number) => {
    setLoading(true);
    try {
      const mockData: Report[] = [
        { key: '1', name: 'Sales Report Q4', pdfurl: 'www.google.com', date: '2024-01-15', status: 'Generated' },
        { key: '2', name: 'User Analytics', pdfurl: 'www.google.com', date: '2024-01-14', status: 'Pending' },
        { key: '3', name: 'Revenue Report', pdfurl: 'www.google.com', date: '2024-01-13', status: 'Generated' },
        { key: '4', name: 'Customer Feedback', pdfurl: 'www.google.com', date: '2024-01-12', status: 'Generated' },
        { key: '5', name: 'Product Analytics', pdfurl: 'www.google.com', date: '2024-01-11', status: 'Pending' },
        { key: '6', name: 'Marketing Report', pdfurl: 'www.google.com', date: '2024-01-10', status: 'Generated' },
        { key: '7', name: 'Inventory Report', pdfurl: 'www.google.com', date: '2024-01-09', status: 'Generated' },
        { key: '8', name: 'Financial Summary', pdfurl: 'www.google.com', date: '2024-01-08', status: 'Pending' },
        { key: '9', name: 'Sales Report Q3', pdfurl: 'www.google.com', date: '2024-01-07', status: 'Generated' },
        { key: '10', name: 'Annual Report', pdfurl: 'www.google.com', date: '2024-01-06', status: 'Generated' },
        { key: '11', name: 'Quarterly Review', pdfurl: 'www.google.com', date: '2024-01-05', status: 'Pending' },
        { key: '12', name: 'Performance Metrics', pdfurl: 'www.google.com', date: '2024-01-04', status: 'Generated' },
      ];
      
      // Add folder path to mock data
      const mockDataWithPath = mockData.map(item => ({
        ...item,
        folderPath: 'Disclosure Under Regulation 46 > Financial > Quarterly'
      }));
      
      const start = (page - 1) * size;
      const paginatedMock = mockDataWithPath.slice(start, start + size);
      
      setData(paginatedMock);
      setTotal(mockDataWithPath.length);
    } catch (error) {
      message.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports(currentPage, pageSize);
  }, [currentPage, pageSize, fetchReports]);

  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const handleActionClick = async (action: string, record: Report) => {
    setLoadingActions(prev => ({
      ...prev,
      [record.key]: {
        ...prev[record.key],
        [action]: true
      }
    }));

    try {
      switch (action.toLowerCase()) {
        case 'view':
          message.info(`Viewing ${record.name}`);
          break;
        case 'edit':
          message.info(`Editing ${record.name}`);
          break;
        case 'delete':
          message.warning(`Deleting ${record.name}`);
          break;
        default:
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      message.error(`Failed to ${action} ${record.name}`);
    } finally {
      setLoadingActions(prev => ({
        ...prev,
        [record.key]: {
          ...prev[record.key],
          [action]: false
        }
      }));
    }
  };

  // Handle parent folder change
  const handleParentFolderChange = (value: string) => {
    setFormValues(prev => ({ 
      ...prev, 
      parentFolder: value,
      subFolder: undefined,
      subSubFolder: undefined
    }));
    
    // Update sub folder options
    const subOptions = getSubFolderOptions(value);
    setSubFolderOptions(subOptions);
    setIsSubFolderDisabled(subOptions.length === 0);
    
    // Reset sub-sub folder
    setSubSubFolderOptions([]);
    setIsSubSubFolderDisabled(true);
  };

  // Handle sub folder change
  const handleSubFolderChange = (value: string) => {
    setFormValues(prev => ({ 
      ...prev, 
      subFolder: value,
      subSubFolder: undefined
    }));
    
    // Update sub-sub folder options
    const parentKey = formValues.parentFolder as string;
    const subSubOptions = getSubSubFolderOptions(parentKey, value);
    setSubSubFolderOptions(subSubOptions);
    setIsSubSubFolderDisabled(subSubOptions.length === 0);
  };

  // Handle sub-sub folder change
  const handleSubSubFolderChange = (value: string) => {
    setFormValues(prev => ({ ...prev, subSubFolder: value }));
  };

  // Handle input field changes
  const handleInputChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Handle dropdown field changes (for tabName, financialYear)
  const handleDropdownChange = (name: string, value: string | string[]) => {
    if (name === 'parentFolder') {
      handleParentFolderChange(value as string);
    } else if (name === 'subFolder') {
      handleSubFolderChange(value as string);
    } else if (name === 'subSubFolder') {
      handleSubSubFolderChange(value as string);
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file upload change
  const handleFileChange = (newFileList: any[]) => {
    setFileList(newFileList);
  };

  // Handle file deletion
  const handleDeleteFile = (fileName: string) => {
    console.log(`File deleted: ${fileName}`);
  };

  // Show modal
  const handleGenerateReport = () => {
    setFormValues({});
    setFileList([]);
    setSubFolderOptions([]);
    setSubSubFolderOptions([]);
    setIsSubFolderDisabled(true);
    setIsSubSubFolderDisabled(true);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setFormValues({});
    setFileList([]);
    setSubFolderOptions([]);
    setSubSubFolderOptions([]);
    setIsSubFolderDisabled(true);
    setIsSubSubFolderDisabled(true);
  };

  // Handle form submission
  const handleModalSubmit = async () => {
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('tabName', formValues.tabName as string);
      formData.append('parentFolder', formValues.parentFolder as string);
      formData.append('subFolder', (formValues.subFolder as string) || '');
      formData.append('subSubFolder', (formValues.subSubFolder as string) || '');
      formData.append('title', formValues.title as string);
      formData.append('financialYear', formValues.financialYear as string);
      
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      }
      
      const folderPath = getFolderPath(
        formValues.parentFolder as string,
        formValues.subFolder as string,
        formValues.subSubFolder as string
      );
      
      console.log('Creating report with values:', {
        tabName: formValues.tabName,
        parentFolder: formValues.parentFolder,
        subFolder: formValues.subFolder,
        subSubFolder: formValues.subSubFolder,
        folderPath: folderPath,
        title: formValues.title,
        financialYear: formValues.financialYear,
        fileName: fileList[0]?.name,
        fileSize: fileList[0]?.size,
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Removed unused tabNameLabel variable
      message.success(`Report "${formValues.title}" created successfully in ${folderPath}!`);
      
      setIsModalVisible(false);
      setFormValues({});
      setFileList([]);
      setSubFolderOptions([]);
      setSubSubFolderOptions([]);
      setIsSubFolderDisabled(true);
      setIsSubSubFolderDisabled(true);
      
      fetchReports(currentPage, pageSize);
      
    } catch (error) {
      console.error('Failed to create report:', error);
      message.error('Failed to create report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // States
    currentPage,
    pageSize,
    loading,
    data,
    total,
    loadingActions,
    isModalVisible,
    submitting,
    fileList,
    formValues,
    parentFolderOptions,
    subFolderOptions,
    subSubFolderOptions,
    isSubFolderDisabled,
    isSubSubFolderDisabled,
    
    // Handlers
    handlePageChange,
    handleActionClick,
    handleInputChange,
    handleDropdownChange,
    handleFileChange,
    handleDeleteFile,
    handleGenerateReport,
    handleModalClose,
    handleModalSubmit,
    
    // Functions
    fetchReports,
  };
};