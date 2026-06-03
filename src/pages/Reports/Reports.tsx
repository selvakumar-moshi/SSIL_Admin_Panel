import { Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TableComponent from '../../components/Table/TableWithPagination';
import ActionIcons from '../../components/Table/ActionIcons';
import { useState, useEffect } from 'react';
import PopupModal from '../../components/PopupModal/PopupModal';
import type { UploadFile } from 'antd/es/upload/interface';
import InputFields from '../../components/InputFields/InputFields';
import DropdownField from '../../components/DropdownField/DropdownField';
import FileUploadSection from '../../components/FileUploadSection/FileUploadSection';
import Button from '../../components/Button/Button';

const { Title } = Typography;

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  
  // Form values state for custom inputs
  const [formValues, setFormValues] = useState<Record<string, string | string[]>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Report form configuration for InputFields (text inputs)
  const inputFields = [
    {
      name: 'tabName',
      label: 'Tab Name',
      placeholder: 'Enter Tab Name',
      required: true,
      type: 'text' as const,
      maxLength: 50,
    },
    {
      name: 'title',
      label: 'Title',
      placeholder: 'Enter Title',
      required: true,
      type: 'text' as const,
      maxLength: 100,
    },
  ];

  // Financial Year dropdown configuration
  const dropdownFields = [
    {
      name: 'financialYear',
      label: 'Financial Year',
      placeholder: 'Select Financial Year',
      required: true,
      options: [
        { value: '2023-2024', label: '2023-2024' },
        { value: '2024-2025', label: '2024-2025' },
        { value: '2025-2026', label: '2025-2026' },
      ],
      showSearch: true,
      inputTestId: 'financial-year-dropdown',
    },
  ];

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (_: any, record: any) => (
        <ActionIcons
          actions={['view', 'download', 'edit', 'delete']}
          disabledActions={[]}
          loadingActions={loadingActions[record.key] || {}}
          onActionClick={(action, record) => handleActionClick(action, record)}
          record={record}
        />
      ),
    },
  ];

  // Mock data fetch function - replace with your actual API call
  const fetchReports = async (page: number, size: number) => {
    setLoading(true);
    try {
      const mockData = [
        { key: '1', name: 'Sales Report Q4',pdfurl:'www.google.com', date: '2024-01-15', status: 'Generated' },
        { key: '2', name: 'User Analytics',pdfurl:'www.google.com', date: '2024-01-14', status: 'Pending' },
        { key: '3', name: 'Revenue Report',pdfurl:'www.google.com', date: '2024-01-13', status: 'Generated' },
        { key: '4', name: 'Customer Feedback',pdfurl:'www.google.com', date: '2024-01-12', status: 'Generated' },
        { key: '5', name: 'Product Analytics',pdfurl:'www.google.com', date: '2024-01-11', status: 'Pending' },
        { key: '6', name: 'Marketing Report',pdfurl:'www.google.com', date: '2024-01-10', status: 'Generated' },
        { key: '7', name: 'Inventory Report',pdfurl:'www.google.com', date: '2024-01-09', status: 'Generated' },
        { key: '8', name: 'Financial Summary',pdfurl:'www.google.com', date: '2024-01-08', status: 'Pending' },
        { key: '9', name: 'Sales Report Q3',pdfurl:'www.google.com', date: '2024-01-07', status: 'Generated' },
        { key: '10', name: 'Annual Report',pdfurl:'www.google.com', date: '2024-01-06', status: 'Generated' },
        { key: '11', name: 'Quarterly Review',pdfurl:'www.google.com', date: '2024-01-05', status: 'Pending' },
        { key: '12', name: 'Performance Metrics',pdfurl:'www.google.com', date: '2024-01-04', status: 'Generated' },
      ];
      
      const start = (page - 1) * size;
      const paginatedMock = mockData.slice(start, start + size);
      
      setData(paginatedMock);
      setTotal(mockData.length);
    } catch (error) {
      message.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const handleActionClick = async (action: string, record: any) => {
    console.log(`${action} clicked for report:`, record);
    
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
          console.log(`Unknown action: ${action}`);
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

  // Validation function for custom inputs
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate Tab Name
    if (!formValues.tabName || (formValues.tabName as string).trim() === '') {
      newErrors.tabName = 'Tab Name is required';
    } else if ((formValues.tabName as string).length < 2) {
      newErrors.tabName = 'Tab name must be at least 2 characters';
    } else if ((formValues.tabName as string).length > 50) {
      newErrors.tabName = 'Tab name must be less than 50 characters';
    }
    
    // Validate Title
    if (!formValues.title || (formValues.title as string).trim() === '') {
      newErrors.title = 'Title is required';
    } else if ((formValues.title as string).length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if ((formValues.title as string).length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    // Validate Financial Year
    if (!formValues.financialYear) {
      newErrors.financialYear = 'Financial Year is required';
    }
    
    // Validate File Upload
    if (fileList.length === 0) {
      newErrors.fileUpload = 'Please upload a file';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input field changes (for text inputs)
  const handleInputChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle dropdown field changes
  const handleDropdownChange = (name: string, value: string | string[]) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user makes a selection
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle file upload change
  const handleFileChange = (newFileList: any[]) => {
    setFileList(newFileList);
    // Clear file upload error when file is uploaded
    if (formErrors.fileUpload && newFileList.length > 0) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.fileUpload;
        return newErrors;
      });
    }
  };

  // Handle file deletion
  const handleDeleteFile = (fileName: string) => {
    console.log(`File deleted: ${fileName}`);
    // Clear file upload error when file is deleted
    if (formErrors.fileUpload) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.fileUpload;
        return newErrors;
      });
    }
  };

  // Show modal when clicking create report button
  const handleGenerateReport = () => {
    setFormValues({});
    setFormErrors({});
    setFileList([]);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setFormValues({});
    setFormErrors({});
    setFileList([]);
  };

  // Handle form submission
  const handleModalSubmit = async () => {
    if (!validateForm()) {
      message.error('Please fix the errors in the form');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Prepare form data for API submission
      const formData = new FormData();
      formData.append('tabName', formValues.tabName as string);
      formData.append('title', formValues.title as string);
      formData.append('financialYear', formValues.financialYear as string);
      
      // Handle file upload - get the actual file object from fileList
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      }
      
      // Here you would make your API call to create the report
      console.log('Creating report with values:', {
        tabName: formValues.tabName,
        title: formValues.title,
        financialYear: formValues.financialYear,
        fileName: fileList[0]?.name,
        fileSize: fileList[0]?.size,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success message
      message.success(`Report "${formValues.title}" created successfully!`);
      
      // Close modal and reset form
      setIsModalVisible(false);
      setFormValues({});
      setFormErrors({});
      setFileList([]);
      
      // Refresh the table data to show the new report
      fetchReports(currentPage, pageSize);
      
    } catch (error) {
      console.error('Failed to create report:', error);
      message.error('Failed to create report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="report_main">
        <Title level={3} style={{ margin: 0 }}>Reports</Title>
        <Button variant="primary" className="page-title__button" onClick={handleGenerateReport}> Create Report</Button>
      </div>

      {/* Table Section */}
      <TableComponent
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered={false}
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
        showSizeChanger={true}
        showQuickJumper={true}
        showPaginationInfo={true}
        pageSizeOptions={['10', '20', '50', '100']}
        paginationInfoText={(start, end, total) => (
          <span style={{ color: '#666' }}>
            Showing {start} to {end} of {total} reports
          </span>
        )}
        size="middle"
        showHeader={true}
        locale={{
          emptyText: 'No reports available'
        }}
      />

      {/* Create Report Popup Modal */}
      <PopupModal
        open={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        title="Create New Report"
        subtitle="Please fill in the details below to create a new report"
        primaryButtonText="Create Report"
        secondaryButtonText="Cancel"
        showFooter={true}
        primaryButtonLoading={submitting}
        secondaryButtonDisabled={submitting}
        primaryButtonDisabled={submitting}
        contentHeight="auto"
        minHeight={450}
      >
        <div style={{ padding: '0 8px' }}>
          {/* Custom Input Fields Component for Text Inputs */}
          <InputFields
            fields={inputFields}
            values={formValues as Record<string, string>}
            errors={formErrors}
            onChange={handleInputChange}
            disabled={submitting}
          />
          
          {/* Custom Dropdown Field Component for Financial Year */}
          <DropdownField
            fields={dropdownFields}
            values={formValues}
            errors={formErrors}
            onChange={handleDropdownChange}
          />
          
          {/* Custom File Upload Section Component */}
          <div className="form-fields-section__field">
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-control">
                <FileUploadSection
                  label="Upload File"
                  maxSize={5}
                  acceptedFormats="PDF, XLSX, CSV, DOC, DOCX"
                  required={true}
                  fileList={fileList}
                  onFileChange={handleFileChange}
                  onDeleteFile={handleDeleteFile}
                />
                {formErrors.fileUpload && fileList.length === 0 && (
                  <div className="form-fields-section__error-message">
                    {formErrors.fileUpload}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PopupModal>
    </div>
  );
};

export default Reports;