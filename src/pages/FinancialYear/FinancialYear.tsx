import React, { useState, useEffect } from 'react';
import { Typography, message } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import ActionIcons from '../../components/Table/ActionIcons';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import Button from '../../components/Button/Button';

const { Title } = Typography;

interface FinancialYearRecord {
  key: string;
  year: string;
  createdAt: string;
}

const FinancialYear = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FinancialYearRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form values
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Table columns
  const columns = [
    {
      title: 'Financial Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: FinancialYearRecord) => (
        <ActionIcons
          actions={['edit', 'delete']}
          disabledActions={[]}
          loadingActions={loadingActions[record.key] || {}}
          onActionClick={(action, record) => handleActionClick(action, record)}
          record={record}
        />
      ),
    },
  ];

  // Input field configuration
  const inputFields = [
    {
      name: 'financialYear',
      label: 'Financial Year',
      placeholder: 'Enter Financial Year (e.g., 2024-2025)',
      required: true,
      type: 'text' as const,
      maxLength: 9, // Format: YYYY-YYYY (e.g., 2024-2025)
      pattern: '^\\d{4}-\\d{4}$',
      helpText: 'Format: YYYY-YYYY (e.g., 2024-2025)',
    },
  ];

  // Fetch financial years data
  const fetchFinancialYears = async (page: number, size: number) => {
    setLoading(true);
    try {
      // Mock API call - replace with your actual API endpoint
      const mockData: FinancialYearRecord[] = [
        { key: '1', year: '2023-2024', createdAt: '2023-04-01T10:30:00Z' },
        { key: '2', year: '2024-2025', createdAt: '2024-04-01T11:45:00Z' },
        { key: '3', year: '2025-2026', createdAt: '2025-04-01T09:15:00Z' },
        { key: '4', year: '2022-2023', createdAt: '2022-04-01T14:20:00Z' },
        { key: '5', year: '2021-2022', createdAt: '2021-04-01T16:00:00Z' },
      ];
      
      const start = (page - 1) * size;
      const paginatedMock = mockData.slice(start, start + size);
      
      setData(paginatedMock);
      setTotal(mockData.length);
    } catch (error) {
      message.error('Failed to fetch financial years');
      console.error('Error fetching financial years:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialYears(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const handleActionClick = async (action: string, record: FinancialYearRecord) => {
    console.log(`${action} clicked for financial year:`, record);
    
    setLoadingActions(prev => ({
      ...prev,
      [record.key]: {
        ...prev[record.key],
        [action]: true
      }
    }));

    try {
      switch (action.toLowerCase()) {
        case 'edit':
          // Open modal with existing data for editing
          setFormValues({ financialYear: record.year });
          setIsModalVisible(true);
          message.info(`Editing ${record.year}`);
          break;
        case 'delete':
          // Confirm before deletion
          const confirmed = window.confirm(`Are you sure you want to delete financial year ${record.year}?`);
          if (confirmed) {
            // Call your delete API here
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success(`Successfully deleted ${record.year}`);
            // Refresh the list
            fetchFinancialYears(currentPage, pageSize);
          }
          break;
        default:
          console.log(`Unknown action: ${action}`);
      }
    } catch (error) {
      message.error(`Failed to ${action} ${record.year}`);
      console.error(`Error ${action} financial year:`, error);
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

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const yearPattern = /^\d{4}-\d{4}$/;
    if (!formValues.financialYear || formValues.financialYear.trim() === '') {
      newErrors.financialYear = 'Financial Year is required';
    } else if (!yearPattern.test(formValues.financialYear)) {
      newErrors.financialYear = 'Please use the format YYYY-YYYY (e.g., 2024-2025)';
    } else {
      const [startYear, endYear] = formValues.financialYear.split('-');
      if (parseInt(endYear) !== parseInt(startYear) + 1) {
        newErrors.financialYear = 'End year must be exactly one year after start year';
      }
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
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

  // Open modal for creating new financial year
  const handleCreateFinancialYear = () => {
    setFormValues({});
    setFormErrors({});
    setIsModalVisible(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setFormValues({});
    setFormErrors({});
  };

  // Handle form submission
  const handleModalSubmit = async () => {
    if (!validateForm()) {
      message.error('Please fix the errors in the form');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Check for duplicate financial year
      const isDuplicate = data.some(item => item.year === formValues.financialYear);
      if (isDuplicate) {
        message.error('Financial year already exists');
        setSubmitting(false);
        return;
      }

      // Here you would make your API call to create the financial year
      console.log('Creating financial year:', {
        year: formValues.financialYear,
        createdAt: new Date().toISOString(),
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success message
      message.success(`Financial year "${formValues.financialYear}" created successfully!`);
      
      // Close modal and reset form
      setIsModalVisible(false);
      setFormValues({});
      setFormErrors({});
      
      // Refresh the table data
      fetchFinancialYears(currentPage, pageSize);
      
    } catch (error) {
      console.error('Failed to create financial year:', error);
      message.error('Failed to create financial year. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="financial-year-container">
      {/* Header Section */}
      <div className="report_main">
        <Title level={3} style={{ margin: 0 }}>Financial Years</Title>
        <Button variant="primary" className="page-title__button" onClick={handleCreateFinancialYear}>Create Financial Year</Button>
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
            Showing {start} to {end} of {total} financial years
          </span>
        )}
        size="middle"
        showHeader={true}
        locale={{
          emptyText: 'No financial years available'
        }}
      />

      {/* Create/Edit Financial Year Popup Modal */}
      <PopupModal
        open={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        title={formValues.financialYear ? "Edit Financial Year" : "Create New Financial Year"}
        subtitle=""
        primaryButtonText={formValues.financialYear ? "Update" : "Create"}
        secondaryButtonText="Cancel"
        showFooter={true}
        primaryButtonLoading={submitting}
        secondaryButtonDisabled={submitting}
        primaryButtonDisabled={submitting}
        contentHeight="auto"
        minHeight={150}
      >
        <div style={{ padding: '0 8px' }}>
          <InputFields
            fields={inputFields}
            values={formValues}
            errors={formErrors}
            onChange={handleInputChange}
            disabled={submitting}
          />
        </div>
      </PopupModal>
    </div>
  );
};

export default FinancialYear;