import React, { useState, useEffect } from 'react';
import { Typography, message } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import ActionIcons from '../../components/Table/ActionIcons';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import Button from '../../components/Button/Button';

const { Title } = Typography;

interface TabNameRecord {
  key: string;
  tabName: string;
  createdAt: string;
  updatedAt?: string;
}

const TabSectionCreation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TabNameRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  
  // Form values
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Table columns
  const columns = [
    {
      title: 'Tab Name',
      dataIndex: 'tabName',
      key: 'tabName',
      sorter: (a: TabNameRecord, b: TabNameRecord) => a.tabName.localeCompare(b.tabName),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: TabNameRecord, b: TabNameRecord) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TabNameRecord) => (
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
      name: 'tabName',
      label: 'Tab Name',
      placeholder: 'Enter Tab Name (e.g., Dashboard, Reports, Analytics)',
      required: true,
      type: 'text' as const,
      maxLength: 50,
      helpText: 'Tab name should be unique and between 3-50 characters',
    },
  ];

  // Fetch tab names data
  const fetchTabNames = async (page: number, size: number) => {
    setLoading(true);
    try {
      // Mock API call - replace with your actual API endpoint
      const mockData: TabNameRecord[] = [
        { 
          key: '1', 
          tabName: 'Dashboard', 
          description: 'Main overview dashboard with key metrics',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-02-20T14:15:00Z'
        },
        { 
          key: '2', 
          tabName: 'Reports', 
          description: 'All system reports and analytics',
          createdAt: '2024-01-16T11:45:00Z',
          updatedAt: '2024-02-18T09:30:00Z'
        },
        { 
          key: '3', 
          tabName: 'Analytics', 
          description: 'Data analytics and insights',
          createdAt: '2024-01-17T09:15:00Z',
          updatedAt: '2024-02-22T16:45:00Z'
        },
        { 
          key: '4', 
          tabName: 'Settings', 
          description: 'System configuration settings',
          createdAt: '2024-01-18T14:20:00Z',
          updatedAt: '2024-02-25T11:00:00Z'
        },
        { 
          key: '5', 
          tabName: 'Users', 
          description: 'User management and roles',
          createdAt: '2024-01-19T16:00:00Z',
          updatedAt: '2024-02-28T10:30:00Z'
        },
        { 
          key: '6', 
          tabName: 'Inventory', 
          description: '',
          createdAt: '2024-02-01T10:00:00Z',
          updatedAt: '2024-02-01T10:00:00Z'
        },
      ];
      
      const start = (page - 1) * size;
      const paginatedMock = mockData.slice(start, start + size);
      
      setData(paginatedMock);
      setTotal(mockData.length);
    } catch (error) {
      message.error('Failed to fetch tab names');
      console.error('Error fetching tab names:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabNames(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const handleActionClick = async (action: string, record: TabNameRecord) => {
    console.log(`${action} clicked for tab name:`, record);
    
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
          setIsEditing(true);
          setEditingKey(record.key);
          setFormValues({ 
            tabName: record.tabName,
          });
          setIsModalVisible(true);
          message.info(`Editing ${record.tabName}`);
          break;
        case 'delete':
          // Confirm before deletion
          const confirmed = window.confirm(`Are you sure you want to delete tab "${record.tabName}"? This action cannot be undone.`);
          if (confirmed) {
            // Call your delete API here
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success(`Successfully deleted tab "${record.tabName}"`);
            // Refresh the list
            fetchTabNames(currentPage, pageSize);
          }
          break;
        default:
          console.log(`Unknown action: ${action}`);
      }
    } catch (error) {
      message.error(`Failed to ${action} ${record.tabName}`);
      console.error(`Error ${action} tab name:`, error);
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
    
    // Validate Tab Name
    if (!formValues.tabName || formValues.tabName.trim() === '') {
      newErrors.tabName = 'Tab Name is required';
    } else if (formValues.tabName.length < 3) {
      newErrors.tabName = 'Tab Name must be at least 3 characters';
    } else if (formValues.tabName.length > 50) {
      newErrors.tabName = 'Tab Name must be less than 50 characters';
    } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(formValues.tabName)) {
      newErrors.tabName = 'Tab Name can only contain letters, numbers, spaces, hyphens, and underscores';
    } else {
      // Check for duplicate tab name (excluding current editing item)
      const isDuplicate = data.some(item => 
        item.tabName.toLowerCase() === formValues.tabName.trim().toLowerCase() &&
        (!isEditing || item.key !== editingKey)
      );
      if (isDuplicate) {
        newErrors.tabName = 'Tab Name already exists. Please use a unique name';
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

  // Open modal for creating new tab name
  const handleCreateTabName = () => {
    setIsEditing(false);
    setEditingKey(null);
    setFormValues({});
    setFormErrors({});
    setIsModalVisible(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    setEditingKey(null);
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
      if (isEditing) {
        // Update existing tab name
        console.log('Updating tab name:', {
          key: editingKey,
          tabName: formValues.tabName,
          updatedAt: new Date().toISOString(),
        });
        
        // Simulate API call for update
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        message.success(`Tab "${formValues.tabName}" updated successfully!`);
      } else {
        // Create new tab name
        console.log('Creating tab name:', {
          tabName: formValues.tabName,
          createdAt: new Date().toISOString(),
        });
        
        // Simulate API call for create
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        message.success(`Tab "${formValues.tabName}" created successfully!`);
      }
      
      // Close modal and reset form
      setIsModalVisible(false);
      setIsEditing(false);
      setEditingKey(null);
      setFormValues({});
      setFormErrors({});
      
      // Refresh the table data
      fetchTabNames(currentPage, pageSize);
      
    } catch (error) {
      console.error('Failed to save tab name:', error);
      message.error(`Failed to ${isEditing ? 'update' : 'create'} tab name. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tab-name-creation-container">
      {/* Header Section */}
      <div className="report_main">
        <Title level={3} style={{ margin: 0 }}>Tab Name</Title>
        <Button variant="primary" className="page-title__button" onClick={handleCreateTabName}>
          Create Tab Name
        </Button>
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
            Showing {start} to {end} of {total} tab names
          </span>
        )}
        size="middle"
        showHeader={true}
        locale={{
          emptyText: 'No tab names available'
        }}
      />

      {/* Create/Edit Tab Name Popup Modal */}
      <PopupModal
        open={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        title={isEditing ? "Edit Tab Name" : "Create New Tab Name"}
        subtitle=""
        primaryButtonText={isEditing ? "Update" : "Create"}
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

export default TabSectionCreation;